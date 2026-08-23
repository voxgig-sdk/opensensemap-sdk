# Opensensemap Python SDK



The Python SDK for the Opensensemap API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Box()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/opensensemap-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from opensensemap_sdk import OpensensemapSDK

client = OpensensemapSDK({
    "apikey": os.environ.get("OPENSENSEMAP_APIKEY"),
})
```

### 2. List box records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    boxs = client.Box().list({"box_id": "example", "sensor_id": "example"})
    for box in boxs:
        print(box)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a box

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    box = client.Box().load({"id": "example_id"})
    print(box)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Box().create({"createdAt": "example_createdAt", "description": "example_description"})

# Update — the created record's id is a plain dict key
client.Box().update({"id": created.data_get()["id"], "createdAt": "example_createdAt", "description": "example_description"})

# Remove
client.Box().remove({"id": created.data_get()["id"]})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    sensors = client.Sensor().list()
    print(sensors)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = OpensensemapSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
sensor = client.Sensor().list()
# sensor contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = OpensensemapSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPENSENSEMAP_TEST_LIVE=TRUE
OPENSENSEMAP_APIKEY=<your-key>
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### OpensensemapSDK

```python
from opensensemap_sdk import OpensensemapSDK

client = OpensensemapSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = OpensensemapSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### OpensensemapSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Box` | `(data) -> BoxEntity` | Create a Box entity instance. |
| `Measurement` | `(data) -> MeasurementEntity` | Create a Measurement entity instance. |
| `Sensor` | `(data) -> SensorEntity` | Create a Sensor entity instance. |
| `Statistic` | `(data) -> StatisticEntity` | Create a Statistic entity instance. |
| `User` | `(data) -> UserEntity` | Create an User entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Box

| Field | Description |
| --- | --- |
| `createdAt` | Creation timestamp |
| `description` | Description of the senseBox |
| `exposure` | Exposure type of the senseBox |
| `grouptag` | Group tag for categorization |
| `id` | Unique identifier for the senseBox |
| `location` |  |
| `model` | Model of the senseBox |
| `name` | Name of the senseBox |
| `sensors` |  |
| `updatedAt` | Last update timestamp |
| `value` | Measurement value |

Operations: Create, List, Load, Remove, Update.

API path: `/boxes`

#### Measurement

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/boxes/{boxId}/data`

#### Sensor

| Field | Description |
| --- | --- |
| `icon` | Icon identifier for the sensor |
| `id` | Unique identifier for the sensor |
| `lastMeasurement` |  |
| `sensorType` | Type of sensor |
| `title` | Title of the sensor |
| `unit` | Unit of measurement |

Operations: List.

API path: `/boxes/{boxId}/sensors`

#### Statistic

| Field | Description |
| --- | --- |
| `count` | Number of measurements |
| `max` | Maximum value |
| `mean` | Mean value |
| `median` | Median value |
| `min` | Minimum value |
| `sum` | Sum of all values |

Operations: Load.

API path: `/statistics/descriptive`

#### User

| Field | Description |
| --- | --- |
| `boxes` | Array of senseBox IDs owned by the user |
| `createdAt` | Account creation timestamp |
| `email` | User's email address |
| `id` | Unique identifier for the user |
| `name` | User's name |
| `password` | User's password |
| `role` | User's role |

Operations: Create, List.

API path: `/users/register`



## Entities


### Box

Create an instance: `box = client.Box()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` | Creation timestamp |
| `description` | `str` | Description of the senseBox |
| `exposure` | `str` | Exposure type of the senseBox |
| `grouptag` | `str` | Group tag for categorization |
| `id` | `str` | Unique identifier for the senseBox |
| `location` | `dict` |  |
| `model` | `str` | Model of the senseBox |
| `name` | `str` | Name of the senseBox |
| `sensors` | `list` |  |
| `updatedAt` | `str` | Last update timestamp |
| `value` | `str` | Measurement value |

#### Example: Load

```python
box = client.Box().load({"id": "box_id"})
```

#### Example: List

```python
boxs = client.Box().list({"box_id": "example", "sensor_id": "example"})
```

#### Example: Create

```python
box = client.Box().create({
})
```


### Measurement

Create an instance: `measurement = client.Measurement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```python
measurement = client.Measurement().create({
    "box_id": "example_box_id",  # str
})
```


### Sensor

Create an instance: `sensor = client.Sensor()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `icon` | `str` | Icon identifier for the sensor |
| `id` | `str` | Unique identifier for the sensor |
| `lastMeasurement` | `dict` |  |
| `sensorType` | `str` | Type of sensor |
| `title` | `str` | Title of the sensor |
| `unit` | `str` | Unit of measurement |

#### Example: List

```python
sensors = client.Sensor().list({"box_id": "example"})
```


### Statistic

Create an instance: `statistic = client.Statistic()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of measurements |
| `max` | `float` | Maximum value |
| `mean` | `float` | Mean value |
| `median` | `float` | Median value |
| `min` | `float` | Minimum value |
| `sum` | `float` | Sum of all values |

#### Example: Load

```python
statistic = client.Statistic().load()
```


### User

Create an instance: `user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `boxes` | `list` | Array of senseBox IDs owned by the user |
| `createdAt` | `str` | Account creation timestamp |
| `email` | `str` | User's email address |
| `id` | `str` | Unique identifier for the user |
| `name` | `str` | User's name |
| `password` | `str` | User's password |
| `role` | `str` | User's role |

#### Example: List

```python
users = client.User().list()
```

#### Example: Create

```python
user = client.User().create({
    "email": "example_email",  # str
    "name": "example_name",  # str
    "password": "example_password",  # str
})
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── opensensemap_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`opensensemap_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
sensor = client.Sensor()
sensor.list()

# sensor.data_get() now returns the sensor data from the last list
# sensor.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
