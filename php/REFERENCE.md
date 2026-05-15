# Opensensemap PHP SDK Reference

Complete API reference for the Opensensemap PHP SDK.


## OpensensemapSDK

### Constructor

```php
require_once __DIR__ . '/opensensemap_sdk.php';

$client = new OpensensemapSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpensensemapSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = OpensensemapSDK::test();
```


### Instance Methods

#### `Box($data = null)`

Create a new `BoxEntity` instance. Pass `null` for no initial data.

#### `Measurement($data = null)`

Create a new `MeasurementEntity` instance. Pass `null` for no initial data.

#### `Sensor($data = null)`

Create a new `SensorEntity` instance. Pass `null` for no initial data.

#### `Statistic($data = null)`

Create a new `StatisticEntity` instance. Pass `null` for no initial data.

#### `User($data = null)`

Create a new `UserEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## BoxEntity

```php
$box = $client->Box();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `exposure` | ``$STRING`` | No |  |
| `grouptag` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `location` | ``$OBJECT`` | No |  |
| `model` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `sensor` | ``$ARRAY`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `value` | ``$STRING`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `exposure` | - | - | Yes | Yes | - |
| `grouptag` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `location` | - | - | Yes | Yes | - |
| `model` | - | - | - | - | - |
| `name` | - | - | Yes | Yes | - |
| `sensor` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |
| `value` | - | - | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->Box()->create([
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Box()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Box()->load(["id" => "box_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): array`

Remove the entity matching the given criteria.

```php
[$result, $err] = $client->Box()->remove(["id" => "box_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): array`

Update an existing entity. The data must include the entity `id`.

```php
[$result, $err] = $client->Box()->update([
  "id" => "box_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): BoxEntity`

Create a new `BoxEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MeasurementEntity

```php
$measurement = $client->Measurement();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->Measurement()->create([
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MeasurementEntity`

Create a new `MeasurementEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SensorEntity

```php
$sensor = $client->Sensor();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `icon` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `last_measurement` | ``$OBJECT`` | No |  |
| `sensor_type` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `unit` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Sensor()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SensorEntity`

Create a new `SensorEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StatisticEntity

```php
$statistic = $client->Statistic();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | No |  |
| `max` | ``$NUMBER`` | No |  |
| `mean` | ``$NUMBER`` | No |  |
| `median` | ``$NUMBER`` | No |  |
| `min` | ``$NUMBER`` | No |  |
| `sum` | ``$NUMBER`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Statistic()->load(["id" => "statistic_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StatisticEntity`

Create a new `StatisticEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## UserEntity

```php
$user = $client->User();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `box` | ``$ARRAY`` | No |  |
| `created_at` | ``$STRING`` | No |  |
| `email` | ``$STRING`` | Yes |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | Yes |  |
| `password` | ``$STRING`` | Yes |  |
| `role` | ``$STRING`` | No |  |
| `token` | ``$STRING`` | No |  |
| `user` | ``$OBJECT`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `box` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `email` | - | Yes | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | Yes | - | - | - |
| `password` | - | - | - | - | - |
| `role` | - | - | - | - | - |
| `token` | - | - | - | - | - |
| `user` | - | - | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->User()->create([
  "email" => /* `$STRING` */,
  "name" => /* `$STRING` */,
  "password" => /* `$STRING` */,
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->User()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): UserEntity`

Create a new `UserEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new OpensensemapSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

