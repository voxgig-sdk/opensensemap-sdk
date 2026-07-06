# Opensensemap TypeScript SDK Reference

Complete API reference for the Opensensemap TypeScript SDK.


## OpensensemapSDK

### Constructor

```ts
new OpensensemapSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpensensemapSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = OpensensemapSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `OpensensemapSDK` instance in test mode.


### Instance Methods

#### `Box(data?: object)`

Create a new `Box` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BoxEntity` instance.

#### `Measurement(data?: object)`

Create a new `Measurement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MeasurementEntity` instance.

#### `Sensor(data?: object)`

Create a new `Sensor` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SensorEntity` instance.

#### `Statistic(data?: object)`

Create a new `Statistic` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StatisticEntity` instance.

#### `User(data?: object)`

Create a new `User` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `OpensensemapSDK.test()`.

**Returns:** `OpensensemapSDK` instance in test mode.


---

## BoxEntity

```ts
const box = client.Box()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `description` | `string` | No |  |
| `exposure` | `string` | No |  |
| `grouptag` | `string` | No |  |
| `id` | `string` | No |  |
| `location` | `Record<string, any>` | No |  |
| `model` | `string` | No |  |
| `name` | `string` | No |  |
| `sensor` | `any[]` | No |  |
| `updated_at` | `string` | No |  |
| `value` | `string` | No |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Box().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Box().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Box().load({ id: 'box_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Box().remove({ id: 'box_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Box().update({
  id: 'box_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BoxEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpensensemapSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MeasurementEntity

```ts
const measurement = client.Measurement()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Measurement().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MeasurementEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpensensemapSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SensorEntity

```ts
const sensor = client.Sensor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `icon` | `string` | No |  |
| `id` | `string` | No |  |
| `last_measurement` | `Record<string, any>` | No |  |
| `sensor_type` | `string` | No |  |
| `title` | `string` | No |  |
| `unit` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Sensor().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SensorEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpensensemapSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StatisticEntity

```ts
const statistic = client.Statistic()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | No |  |
| `max` | `number` | No |  |
| `mean` | `number` | No |  |
| `median` | `number` | No |  |
| `min` | `number` | No |  |
| `sum` | `number` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Statistic().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StatisticEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpensensemapSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserEntity

```ts
const user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `box` | `any[]` | No |  |
| `created_at` | `string` | No |  |
| `email` | `string` | Yes |  |
| `id` | `string` | No |  |
| `name` | `string` | Yes |  |
| `password` | `string` | Yes |  |
| `role` | `string` | No |  |
| `token` | `string` | No |  |
| `user` | `Record<string, any>` | No |  |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `box` | - | - |
| `created_at` | - | - |
| `email` | Yes | - |
| `id` | - | - |
| `name` | Yes | - |
| `password` | - | - |
| `role` | - | - |
| `token` | - | - |
| `user` | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.User().create({
  email: /* string */,
  name: /* string */,
  password: /* string */,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.User().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpensensemapSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new OpensensemapSDK({
  feature: {
    test: { active: true },
  }
})
```

