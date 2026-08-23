# Opensensemap Python SDK Reference

Complete API reference for the Opensensemap Python SDK.


## OpensensemapSDK

### Constructor

```python
from opensensemap_sdk import OpensensemapSDK

client = OpensensemapSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpensensemapSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = OpensensemapSDK.test()
```


### Instance Methods

#### `Box(data=None)`

Create a new `BoxEntity` instance. Pass `None` for no initial data.

#### `Measurement(data=None)`

Create a new `MeasurementEntity` instance. Pass `None` for no initial data.

#### `Sensor(data=None)`

Create a new `SensorEntity` instance. Pass `None` for no initial data.

#### `Statistic(data=None)`

Create a new `StatisticEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BoxEntity

```python
box = client.Box()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | No | Creation timestamp |
| `description` | `str` | No | Description of the senseBox |
| `exposure` | `str` | No | Exposure type of the senseBox |
| `grouptag` | `str` | No | Group tag for categorization |
| `id` | `str` | No | Unique identifier for the senseBox |
| `location` | `dict` | No |  |
| `model` | `str` | No | Model of the senseBox |
| `name` | `str` | No | Name of the senseBox |
| `sensors` | `list` | No |  |
| `updatedAt` | `str` | No | Last update timestamp |
| `value` | `str` | No | Measurement value |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `createdAt` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `exposure` | - | - | Yes | Yes | - |
| `grouptag` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `location` | - | - | Yes | Yes | - |
| `model` | - | - | - | - | - |
| `name` | - | - | Yes | Yes | - |
| `sensors` | - | - | - | - | - |
| `updatedAt` | - | - | - | - | - |
| `value` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Box().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Box().list({"box_id": "example", "sensor_id": "example"})
for box in results:
    print(box)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Box().load({"id": "box_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Box().remove({"id": "box_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Box().update({
    "id": "box_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BoxEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MeasurementEntity

```python
measurement = client.Measurement()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Measurement().create({
    "box_id": "example_box_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeasurementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SensorEntity

```python
sensor = client.Sensor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `icon` | `str` | No | Icon identifier for the sensor |
| `id` | `str` | No | Unique identifier for the sensor |
| `lastMeasurement` | `dict` | No |  |
| `sensorType` | `str` | No | Type of sensor |
| `title` | `str` | No | Title of the sensor |
| `unit` | `str` | No | Unit of measurement |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Sensor().list({"box_id": "example"})
for sensor in results:
    print(sensor)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SensorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StatisticEntity

```python
statistic = client.Statistic()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | Number of measurements |
| `max` | `float` | No | Maximum value |
| `mean` | `float` | No | Mean value |
| `median` | `float` | No | Median value |
| `min` | `float` | No | Minimum value |
| `sum` | `float` | No | Sum of all values |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Statistic().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StatisticEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boxes` | `list` | No | Array of senseBox IDs owned by the user |
| `createdAt` | `str` | No | Account creation timestamp |
| `email` | `str` | Yes | User's email address |
| `id` | `str` | No | Unique identifier for the user |
| `name` | `str` | Yes | User's name |
| `password` | `str` | Yes | User's password |
| `role` | `str` | No | User's role |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `boxes` | - | - |
| `createdAt` | - | - |
| `email` | Yes | Yes |
| `id` | - | - |
| `name` | Yes | Yes |
| `password` | - | - |
| `role` | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.User().create({
    "email": "example_email",  # str
    "name": "example_name",  # str
    "password": "example_password",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.User().list()
for user in results:
    print(user)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = OpensensemapSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

