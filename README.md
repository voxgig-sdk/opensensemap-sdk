# Opensensemap SDK

Citizen-science platform for registering senseBoxes and sharing environmental sensor measurements

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About openSenseMap API

[openSenseMap](https://opensensemap.org) is an open data platform that collects and publishes environmental measurements from citizen-science sensor stations called senseBoxes. The API at `https://api.opensensemap.org` lets you register and administer boxes, post new sensor readings, and query measurements and statistics from boxes around the world.

What you get from the API:

- Box management: list, retrieve, create, update, claim, and delete senseBoxes, and fetch the Arduino sketch for a given hardware configuration
- Measurements: submit individual or batched sensor readings, fetch raw and aggregated measurement data across boxes, and retrieve location history for mobile boxes
- Statistics: descriptive statistics, inverse-distance-weighting (IDW) interpolation across an area, and platform-wide counts
- Users: registration, sign-in, sign-out, password reset, JWT refresh, and profile management

Public read endpoints (boxes, sensors, measurements, statistics) require no authentication and CORS is enabled. Write operations and any per-user data use JWT bearer tokens issued by the sign-in endpoint. Responses are returned as JSON, with CSV and GeoJSON available for several measurement and box endpoints.

## Try it

**TypeScript**
```bash
npm install opensensemap
```

**Python**
```bash
pip install opensensemap-sdk
```

**PHP**
```bash
composer require voxgig/opensensemap-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/opensensemap-sdk/go
```

**Ruby**
```bash
gem install opensensemap-sdk
```

**Lua**
```bash
luarocks install opensensemap-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { OpensensemapSDK } from 'opensensemap'

const client = new OpensensemapSDK({})

// List all boxs
const boxs = await client.Box().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o opensensemap-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "opensensemap": {
      "command": "/abs/path/to/opensensemap-mcp"
    }
  }
}
```

## Entities

The API exposes 5 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Box** | A senseBox sensor station registered on the platform, exposed via `/boxes` and `/boxes/{boxId}` for listing, retrieval, registration, and administration. | `/boxes` |
| **Measurement** | Individual sensor readings posted to and read from a box, via endpoints such as `/boxes/{boxId}/{sensorId}` and the cross-box `/boxes/data` query. | `/boxes/{boxId}/data` |
| **Sensor** | A single phenomenon (e.g. temperature, PM2.5) attached to a box, addressed under `/boxes/{boxId}/sensors` and used as the target for measurement uploads. | `/boxes/{boxId}/sensors` |
| **Statistic** | Aggregate views over measurements and the platform, including descriptive statistics, IDW interpolation, and overall counts under `/statistics`. | `/statistics/descriptive` |
| **User** | Registered account that can own and administer boxes; managed through `/users` endpoints for sign-up, sign-in, profile, and JWT refresh. | `/users/register` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from opensensemap_sdk import OpensensemapSDK

client = OpensensemapSDK({})

# List all boxs
boxs, err = client.Box(None).list(None, None)

# Load a specific box
box, err = client.Box(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'opensensemap_sdk.php';

$client = new OpensensemapSDK([]);

// List all boxs
[$boxs, $err] = $client->Box(null)->list(null, null);

// Load a specific box
[$box, $err] = $client->Box(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/opensensemap-sdk/go"

client := sdk.NewOpensensemapSDK(map[string]any{})

// List all boxs
boxs, err := client.Box(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Opensensemap_sdk"

client = OpensensemapSDK.new({})

# List all boxs
boxs, err = client.Box(nil).list(nil, nil)

# Load a specific box
box, err = client.Box(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("opensensemap_sdk")

local client = sdk.new({})

-- List all boxs
local boxs, err = client:Box(nil):list(nil, nil)

-- Load a specific box
local box, err = client:Box(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = OpensensemapSDK.test()
const result = await client.Box().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = OpensensemapSDK.test(None, None)
result, err = client.Box(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = OpensensemapSDK::test(null, null);
[$result, $err] = $client->Box(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Box(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = OpensensemapSDK.test(nil, nil)
result, err = client.Box(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Box(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the openSenseMap API

- Upstream: [https://opensensemap.org](https://opensensemap.org)
- API docs: [https://docs.opensensemap.org](https://docs.opensensemap.org)

---

Generated from the openSenseMap API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
