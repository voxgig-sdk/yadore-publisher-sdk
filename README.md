# YadorePublisher SDK

Access affiliate offers, deeplinks, and conversion reports from Yadore's catalogue of 12,000+ merchants across 40+ markets

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Yadore Publisher API

The Yadore Publisher API is the affiliate-marketing interface from [Yadore GmbH](https://www.yadore.com/), a German e-commerce data platform that aggregates and normalises product feeds for online publishers and advertisers. It exposes the same offer, merchant, deeplink, and reporting data that powers Yadore's WordPress and link-replacement integrations.

What you can do with the API:

- Search and retrieve merchant **offers** (product records) drawn from a catalogue of 12,000+ merchants in 40+ markets.
- Generate **deeplinks** and merchant-specific tracking URLs for clicks and redirects.
- Pull **conversion** data — general lists, per-conversion detail, merchant breakdowns, and status records.
- Pull **reports** — general daily revenue stats, detailed click/placement analytics, modified-records snapshots, and report status.
- Manage configuration around **markets**, **merchants**, and Do-Not-Track (**dnt**) settings.

Operational notes: the API is served from `https://api.yadore.com/` and authenticates via an API key issued with a publisher account. Public uptime monitors report a sub-250 ms average response time. CORS is not enabled, so calls should be made server-side.

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

## 30-second quickstart

### TypeScript

```ts
import { YadorePublisherSDK } from 'yadore-publisher'

const client = new YadorePublisherSDK({})

// List all conversiondetails
const conversiondetails = await client.ConversionDetail().list()
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
| **ConversionDetail** | Detailed per-conversion records returned by the conversions endpoints, including click and order metadata. | `/v2/conversion/detail` |
| **ConversionDetailMerchant** | Per-merchant breakdown of conversion detail records, grouping conversions by the originating merchant. | `/v2/conversion/detail/merchant` |
| **ConversionGeneral** | Summary list of conversions across the publisher account, used for top-level conversion reporting. | `/v2/conversion/general` |
| **ConversionStatus** | Status information for conversions (e.g. pending, confirmed, cancelled) as tracked by Yadore. | `/v2/conversion/status` |
| **Deeplink** | Generated affiliate deeplinks that wrap a destination URL with the publisher's tracking parameters. | `/v2/deeplink` |
| **DeeplinkMerchant** | Merchant-scoped deeplink resources, used to create or list deeplinks for a specific merchant. | `/v2/deeplink/merchant` |
| **Dnt** | Do-Not-Track configuration entries that exclude specified traffic or sources from tracking. | `/v2/d` |
| **Market** | Country or market definitions Yadore supports (40+ markets) for filtering offers, merchants, and reports. | `/v2/markets` |
| **Merchant** | Catalogue of advertiser merchants available to the publisher, with metadata about each shop. | `/v2/merchant` |
| **Offer** | Individual product offers from merchants, the core search resource for product-level affiliate data. | `/v2/offer` |
| **ReportDetail** | Detailed click- and placement-level analytics records, suitable for granular performance analysis. | `/v2/report/detail` |
| **ReportGeneral** | High-level daily revenue and traffic statistics rolled up across the publisher account. | `/v2/report/general` |
| **ReportModified** | Snapshot of records that have changed since a given point, used for incremental report syncing. | `/v2/report/modified` |
| **ReportStatus** | Status metadata for generated reports, indicating availability and processing state. | `/v2/report/status` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from yadorepublisher_sdk import YadorePublisherSDK

client = YadorePublisherSDK({})

# List all conversiondetails
conversiondetails, err = client.ConversionDetail(None).list(None, None)
```

### PHP

```php
<?php
require_once 'yadorepublisher_sdk.php';

$client = new YadorePublisherSDK([]);

// List all conversiondetails
[$conversiondetails, $err] = $client->ConversionDetail(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/yadore-publisher-sdk/go"

client := sdk.NewYadorePublisherSDK(map[string]any{})

// List all conversiondetails
conversiondetails, err := client.ConversionDetail(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "YadorePublisher_sdk"

client = YadorePublisherSDK.new({})

# List all conversiondetails
conversiondetails, err = client.ConversionDetail(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("yadore-publisher_sdk")

local client = sdk.new({})

-- List all conversiondetails
local conversiondetails, err = client:ConversionDetail(nil):list(nil, nil)
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
client = YadorePublisherSDK.test(None, None)
result, err = client.ConversionDetail(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = YadorePublisherSDK::test(null, null);
[$result, $err] = $client->ConversionDetail(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.ConversionDetail(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = YadorePublisherSDK.test(nil, nil)
result, err = client.ConversionDetail(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:ConversionDetail(nil):load(
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

## Using the Yadore Publisher API

- Upstream: [https://www.yadore.com/](https://www.yadore.com/)
- API docs: [https://docs.yadore.com/](https://docs.yadore.com/)

- Proprietary commercial API operated by [Yadore GmbH](https://www.yadore.com/).
- Use is governed by the Yadore publisher agreement; an API key is required.
- No public licence text is published alongside the API spec.
- Per-click payout model rather than a redistributable data licence.

---

Generated from the Yadore Publisher API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
