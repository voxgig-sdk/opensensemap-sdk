# Opensensemap Lua SDK Reference

Complete API reference for the Opensensemap Lua SDK.


## OpensensemapSDK

### Constructor

```lua
local sdk = require("opensensemap_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Box(data)`

Create a new `Box` entity instance. Pass `nil` for no initial data.

#### `Measurement(data)`

Create a new `Measurement` entity instance. Pass `nil` for no initial data.

#### `Sensor(data)`

Create a new `Sensor` entity instance. Pass `nil` for no initial data.

#### `Statistic(data)`

Create a new `Statistic` entity instance. Pass `nil` for no initial data.

#### `User(data)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BoxEntity

```lua
local box = client:Box(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | Creation timestamp |
| `description` | `string` | No | Description of the senseBox |
| `exposure` | `string` | No | Exposure type of the senseBox |
| `grouptag` | `string` | No | Group tag for categorization |
| `id` | `string` | No | Unique identifier for the senseBox |
| `location` | `table` | No |  |
| `model` | `string` | No | Model of the senseBox |
| `name` | `string` | No | Name of the senseBox |
| `sensors` | `table` | No |  |
| `updatedAt` | `string` | No | Last update timestamp |
| `value` | `string` | No | Measurement value |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Box():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Box():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Box():load({ id = "box_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Box():remove({ id = "box_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Box():update({
  id = "box_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BoxEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MeasurementEntity

```lua
local measurement = client:Measurement(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Measurement():create({
  box_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeasurementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SensorEntity

```lua
local sensor = client:Sensor(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `icon` | `string` | No | Icon identifier for the sensor |
| `id` | `string` | No | Unique identifier for the sensor |
| `lastMeasurement` | `table` | No |  |
| `sensorType` | `string` | No | Type of sensor |
| `title` | `string` | No | Title of the sensor |
| `unit` | `string` | No | Unit of measurement |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Sensor():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SensorEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StatisticEntity

```lua
local statistic = client:Statistic(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | No | Number of measurements |
| `max` | `number` | No | Maximum value |
| `mean` | `number` | No | Mean value |
| `median` | `number` | No | Median value |
| `min` | `number` | No | Minimum value |
| `sum` | `number` | No | Sum of all values |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Statistic():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StatisticEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserEntity

```lua
local user = client:User(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boxes` | `table` | No | Array of senseBox IDs owned by the user |
| `createdAt` | `string` | No | Account creation timestamp |
| `email` | `string` | Yes | User's email address |
| `id` | `string` | No | Unique identifier for the user |
| `name` | `string` | Yes | User's name |
| `password` | `string` | Yes | User's password |
| `role` | `string` | No | User's role |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:User():create({
  email = --[[ string ]],
  name = --[[ string ]],
  password = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:User():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

