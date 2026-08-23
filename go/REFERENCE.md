# Opensensemap Golang SDK Reference

Complete API reference for the Opensensemap Golang SDK.


## OpensensemapSDK

### Constructor

```go
func NewOpensensemapSDK(options map[string]any) *OpensensemapSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *OpensensemapSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *OpensensemapSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Box(data map[string]any) OpensensemapEntity`

Create a new `Box` entity instance. Pass `nil` for no initial data.

#### `Measurement(data map[string]any) OpensensemapEntity`

Create a new `Measurement` entity instance. Pass `nil` for no initial data.

#### `Sensor(data map[string]any) OpensensemapEntity`

Create a new `Sensor` entity instance. Pass `nil` for no initial data.

#### `Statistic(data map[string]any) OpensensemapEntity`

Create a new `Statistic` entity instance. Pass `nil` for no initial data.

#### `User(data map[string]any) OpensensemapEntity`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BoxEntity

```go
box := client.Box(nil)
fmt.Println(box.GetName()) // "box"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | Creation timestamp |
| `description` | `string` | No | Description of the senseBox |
| `exposure` | `string` | No | Exposure type of the senseBox |
| `grouptag` | `string` | No | Group tag for categorization |
| `id` | `string` | No | Unique identifier for the senseBox |
| `location` | `map[string]any` | No |  |
| `model` | `string` | No | Model of the senseBox |
| `name` | `string` | No | Name of the senseBox |
| `sensors` | `[]any` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Box(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Box(nil).Load(map[string]any{"id": "box_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Box(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Box(nil).Update(map[string]any{
    "id": "box_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Box(nil).Remove(map[string]any{"id": "box_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BoxEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MeasurementEntity

```go
measurement := client.Measurement(nil)
fmt.Println(measurement.GetName()) // "measurement"
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Measurement(nil).Create(map[string]any{
    "box_id": "example_box_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MeasurementEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SensorEntity

```go
sensor := client.Sensor(nil)
fmt.Println(sensor.GetName()) // "sensor"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `icon` | `string` | No | Icon identifier for the sensor |
| `id` | `string` | No | Unique identifier for the sensor |
| `lastMeasurement` | `map[string]any` | No |  |
| `sensorType` | `string` | No | Type of sensor |
| `title` | `string` | No | Title of the sensor |
| `unit` | `string` | No | Unit of measurement |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Sensor(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SensorEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StatisticEntity

```go
statistic := client.Statistic(nil)
fmt.Println(statistic.GetName()) // "statistic"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | Number of measurements |
| `max` | `float64` | No | Maximum value |
| `mean` | `float64` | No | Mean value |
| `median` | `float64` | No | Median value |
| `min` | `float64` | No | Minimum value |
| `sum` | `float64` | No | Sum of all values |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Statistic(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StatisticEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserEntity

```go
user := client.User(nil)
fmt.Println(user.GetName()) // "user"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `boxes` | `[]any` | No | Array of senseBox IDs owned by the user |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.User(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.User(nil).Create(map[string]any{
    "email": "example_email",
    "name": "example_name",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewOpensensemapSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

