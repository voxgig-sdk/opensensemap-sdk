# Opensensemap TypeScript SDK



The TypeScript SDK for the Opensensemap API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
npm install opensensemap
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { OpensensemapSDK } from 'opensensemap'

const client = new OpensensemapSDK({
  apikey: process.env.OPENSENSEMAP_APIKEY,
})
```

### 2. List boxs

```ts
const result = await client.Box().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```

### 3. Load a box

```ts
const result = await client.Box().load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
}
```

### 4. Create, update, and remove

```ts
// Create
const created = await client.Box().create({
  name: 'Example',
})

// Update
const updated = await client.Box().update({
  id: created.data.id,
  name: 'Example-Renamed',
})

// Remove
const removed = await client.Box().remove({
  id: created.data.id,
})
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = OpensensemapSDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new OpensensemapSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new OpensensemapSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### OpensensemapSDK

#### Constructor

```ts
new OpensensemapSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Box(data?)` | `BoxEntity` | Create a Box entity instance. |
| `Measurement(data?)` | `MeasurementEntity` | Create a Measurement entity instance. |
| `Sensor(data?)` | `SensorEntity` | Create a Sensor entity instance. |
| `Statistic(data?)` | `StatisticEntity` | Create a Statistic entity instance. |
| `User(data?)` | `UserEntity` | Create a User entity instance. |
| `tester(testopts?, sdkopts?)` | `OpensensemapSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `OpensensemapSDK.test(testopts?, sdkopts?)` | `OpensensemapSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): OpensensemapSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Box

| Field | Description |
| --- | --- |
| `created_at` |  |
| `description` |  |
| `exposure` |  |
| `grouptag` |  |
| `id` |  |
| `location` |  |
| `model` |  |
| `name` |  |
| `sensor` |  |
| `updated_at` |  |
| `value` |  |

Operations: create, list, load, remove, update.

API path: `/boxes`

#### Measurement

| Field | Description |
| --- | --- |

Operations: create.

API path: `/boxes/{boxId}/data`

#### Sensor

| Field | Description |
| --- | --- |
| `icon` |  |
| `id` |  |
| `last_measurement` |  |
| `sensor_type` |  |
| `title` |  |
| `unit` |  |

Operations: list.

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

Operations: load.

API path: `/statistics/descriptive`

#### User

| Field | Description |
| --- | --- |
| `box` |  |
| `created_at` |  |
| `email` |  |
| `id` |  |
| `name` |  |
| `password` |  |
| `role` |  |
| `token` |  |
| `user` |  |

Operations: create, list.

API path: `/users/register`



## Entities


### Box

Create an instance: `const box = client.Box()`

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
| `created_at` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `exposure` | ``$STRING`` |  |
| `grouptag` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `location` | ``$OBJECT`` |  |
| `model` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `sensor` | ``$ARRAY`` |  |
| `updated_at` | ``$STRING`` |  |
| `value` | ``$STRING`` |  |

#### Example: Load

```ts
const box = await client.Box().load({ id: 'box_id' })
```

#### Example: List

```ts
const boxs = await client.Box().list()
```

#### Example: Create

```ts
const box = await client.Box().create({
})
```


### Measurement

Create an instance: `const measurement = client.Measurement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const measurement = await client.Measurement().create({
})
```


### Sensor

Create an instance: `const sensor = client.Sensor()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `icon` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `last_measurement` | ``$OBJECT`` |  |
| `sensor_type` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `unit` | ``$STRING`` |  |

#### Example: List

```ts
const sensors = await client.Sensor().list()
```


### Statistic

Create an instance: `const statistic = client.Statistic()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max` | ``$NUMBER`` |  |
| `mean` | ``$NUMBER`` |  |
| `median` | ``$NUMBER`` |  |
| `min` | ``$NUMBER`` |  |
| `sum` | ``$NUMBER`` |  |

#### Example: Load

```ts
const statistic = await client.Statistic().load({ id: 'statistic_id' })
```


### User

Create an instance: `const user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `box` | ``$ARRAY`` |  |
| `created_at` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `password` | ``$STRING`` |  |
| `role` | ``$STRING`` |  |
| `token` | ``$STRING`` |  |
| `user` | ``$OBJECT`` |  |

#### Example: List

```ts
const users = await client.User().list()
```

#### Example: Create

```ts
const user = await client.User().create({
  email: /* `$STRING` */,
  name: /* `$STRING` */,
  password: /* `$STRING` */,
})
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
opensensemap/
├── src/
│   ├── OpensensemapSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { OpensensemapSDK } from 'opensensemap'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
