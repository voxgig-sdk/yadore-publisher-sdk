# YadorePublisher SDK

Yadore Publisher API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## Try it

**TypeScript**
```bash
npm install yadore-publisher
```

**Python**
```bash
pip install yadore-publisher-sdk
```

**PHP**
```bash
composer require voxgig/yadore-publisher-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/yadore-publisher-sdk/go
```

**Ruby**
```bash
gem install yadore-publisher-sdk
```

**Lua**
```bash
luarocks install yadore-publisher-sdk
```

## Quickstart

### TypeScript

```ts
import { YadorePublisherSDK } from 'yadore-publisher'

const client = new YadorePublisherSDK({
  apikey: process.env.YADORE-PUBLISHER_APIKEY,
})

// List all conversiondetails
const conversiondetails = await client.ConversionDetail().list()
console.log(conversiondetails.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o yadore-publisher-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "yadore-publisher": {
      "command": "/abs/path/to/yadore-publisher-mcp"
    }
  }
}
```

## Entities

The API exposes 14 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **ConversionDetail** |  | `/v2/conversion/detail` |
| **ConversionDetailMerchant** |  | `/v2/conversion/detail/merchant` |
| **ConversionGeneral** |  | `/v2/conversion/general` |
| **ConversionStatus** |  | `/v2/conversion/status` |
| **Deeplink** |  | `/v2/deeplink` |
| **DeeplinkMerchant** |  | `/v2/deeplink/merchant` |
| **Dnt** |  | `/v2/d` |
| **Market** |  | `/v2/markets` |
| **Merchant** |  | `/v2/merchant` |
| **Offer** |  | `/v2/offer` |
| **ReportDetail** |  | `/v2/report/detail` |
| **ReportGeneral** |  | `/v2/report/general` |
| **ReportModified** |  | `/v2/report/modified` |
| **ReportStatus** |  | `/v2/report/status` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from yadorepublisher_sdk import YadorePublisherSDK

client = YadorePublisherSDK({
    "apikey": os.environ.get("YADORE-PUBLISHER_APIKEY"),
})

# List all conversiondetails
conversiondetails, err = client.ConversionDetail().list()
print(conversiondetails)
```

### PHP

```php
<?php
require_once 'yadorepublisher_sdk.php';

$client = new YadorePublisherSDK([
    "apikey" => getenv("YADORE-PUBLISHER_APIKEY"),
]);

// List all conversiondetails
[$conversiondetails, $err] = $client->ConversionDetail()->list();
print_r($conversiondetails);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/yadore-publisher-sdk/go"

client := sdk.NewYadorePublisherSDK(map[string]any{
    "apikey": os.Getenv("YADORE-PUBLISHER_APIKEY"),
})

// List all conversiondetails
conversiondetails, err := client.ConversionDetail(nil).List(nil, nil)
fmt.Println(conversiondetails)
```

### Ruby

```ruby
require_relative "YadorePublisher_sdk"

client = YadorePublisherSDK.new({
  "apikey" => ENV["YADORE-PUBLISHER_APIKEY"],
})

# List all conversiondetails
conversiondetails, err = client.ConversionDetail().list
puts conversiondetails
```

### Lua

```lua
local sdk = require("yadore-publisher_sdk")

local client = sdk.new({
  apikey = os.getenv("YADORE-PUBLISHER_APIKEY"),
})

-- List all conversiondetails
local conversiondetails, err = client:ConversionDetail():list()
print(conversiondetails)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = YadorePublisherSDK.test()
const result = await client.ConversionDetail().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = YadorePublisherSDK.test()
result, err = client.ConversionDetail().load({"id": "test01"})
```

### PHP

```php
$client = YadorePublisherSDK::test();
[$result, $err] = $client->ConversionDetail()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.ConversionDetail(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = YadorePublisherSDK.test
result, err = client.ConversionDetail().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:ConversionDetail():load({ id = "test01" })
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

---

Generated from the Yadore Publisher API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
