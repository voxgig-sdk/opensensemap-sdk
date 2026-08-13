# Opensensemap PHP SDK



The PHP SDK for the Opensensemap API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Box()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/opensensemap-sdk/releases](https://github.com/voxgig-sdk/opensensemap-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'opensensemap_sdk.php';

$client = new OpensensemapSDK([
    "apikey" => getenv("OPENSENSEMAP_APIKEY"),
]);
```

### 2. List box records

```php
try {
    // list() returns an array of Box records — iterate directly.
    $boxs = $client->Box()->list();
    foreach ($boxs as $item) {
        echo $item["id"] . " " . $item["createdAt"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a box

```php
try {
    // load() returns the ENTITY — call data_get() for the Box record (throws on error).
    $box = $client->Box()->load(["id" => "example_id"]);
    print_r($box);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Box record.
$created = $client->Box()->create(["createdAt" => "example_createdAt", "description" => "example_description"]);

// Update — index the record via data_get() ($created->data_get()["id"]).
$client->Box()->update(["id" => $created->data_get()["id"], "createdAt" => "example_createdAt", "description" => "example_description"]);

// Remove
$client->Box()->remove(["id" => $created->data_get()["id"]]);
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $sensors = $client->Sensor()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = OpensensemapSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$sensor = $client->Sensor()->list();
print_r($sensor);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new OpensensemapSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPENSENSEMAP_TEST_LIVE=TRUE
OPENSENSEMAP_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### OpensensemapSDK

```php
require_once 'opensensemap_sdk.php';
$client = new OpensensemapSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = OpensensemapSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### OpensensemapSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Box` | `($data): BoxEntity` | Create a Box entity instance. |
| `Measurement` | `($data): MeasurementEntity` | Create a Measurement entity instance. |
| `Sensor` | `($data): SensorEntity` | Create a Sensor entity instance. |
| `Statistic` | `($data): StatisticEntity` | Create a Statistic entity instance. |
| `User` | `($data): UserEntity` | Create an User entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Box

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `description` |  |
| `exposure` |  |
| `grouptag` |  |
| `id` |  |
| `location` |  |
| `model` |  |
| `name` |  |
| `sensors` |  |
| `updatedAt` |  |
| `value` |  |

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
| `icon` |  |
| `id` |  |
| `lastMeasurement` |  |
| `sensorType` |  |
| `title` |  |
| `unit` |  |

Operations: List.

API path: `/boxes/{boxId}/sensors`

#### Statistic

| Field | Description |
| --- | --- |
| `count` |  |
| `max` |  |
| `mean` |  |
| `median` |  |
| `min` |  |
| `sum` |  |

Operations: Load.

API path: `/statistics/descriptive`

#### User

| Field | Description |
| --- | --- |
| `boxes` |  |
| `createdAt` |  |
| `email` |  |
| `id` |  |
| `name` |  |
| `password` |  |
| `role` |  |

Operations: Create, List.

API path: `/users/register`



## Entities


### Box

Create an instance: `$box = $client->Box();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `description` | `string` |  |
| `exposure` | `string` |  |
| `grouptag` | `string` |  |
| `id` | `string` |  |
| `location` | `array` |  |
| `model` | `string` |  |
| `name` | `string` |  |
| `sensors` | `array` |  |
| `updatedAt` | `string` |  |
| `value` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Box record (throws on error).
$box = $client->Box()->load(["id" => "box_id"]);
```

#### Example: List

```php
// list() returns an array of Box records (throws on error).
$boxs = $client->Box()->list();
```

#### Example: Create

```php
$box = $client->Box()->create([
]);
```


### Measurement

Create an instance: `$measurement = $client->Measurement();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$measurement = $client->Measurement()->create([
    "box_id" => null, // string
]);
```


### Sensor

Create an instance: `$sensor = $client->Sensor();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `icon` | `string` |  |
| `id` | `string` |  |
| `lastMeasurement` | `array` |  |
| `sensorType` | `string` |  |
| `title` | `string` |  |
| `unit` | `string` |  |

#### Example: List

```php
// list() returns an array of Sensor records (throws on error).
$sensors = $client->Sensor()->list();
```


### Statistic

Create an instance: `$statistic = $client->Statistic();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` |  |
| `max` | `float` |  |
| `mean` | `float` |  |
| `median` | `float` |  |
| `min` | `float` |  |
| `sum` | `float` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Statistic record (throws on error).
$statistic = $client->Statistic()->load();
```


### User

Create an instance: `$user = $client->User();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `boxes` | `array` |  |
| `createdAt` | `string` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `password` | `string` |  |
| `role` | `string` |  |

#### Example: List

```php
// list() returns an array of User records (throws on error).
$users = $client->User()->list();
```

#### Example: Create

```php
$user = $client->User()->create([
    "email" => null, // string
    "name" => null, // string
    "password" => null, // string
]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── opensensemap_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`opensensemap_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$sensor = $client->Sensor();
$sensor->list();

// $sensor->data_get() now returns the sensor data from the last list
// $sensor->match_get() returns the last match criteria
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
