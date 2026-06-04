# YadorePublisher Lua SDK

The Lua SDK for the YadorePublisher API. Provides an entity-oriented interface using Lua conventions.


## Install
```bash
luarocks install yadore-publisher-sdk
```

If the module is not yet published, add the source directory to
your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("yadore-publisher_sdk")

local client = sdk.new({})
```

### 2. List conversiondetails

```lua
local result, err = client:ConversionDetail(nil):list(nil, nil)
if err then error(err) end

if type(result) == "table" then
  for _, item in ipairs(result) do
    local d = item:data_get()
    print(d["id"], d["name"])
  end
end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test(nil, nil)

local result, err = client:YadorePublisher(nil):load(
  { id = "test01" }, nil
)
-- result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
YADORE-PUBLISHER_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### YadorePublisherSDK

```lua
local sdk = require("yadore-publisher_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### YadorePublisherSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `ConversionDetail` | `(data) -> ConversionDetailEntity` | Create a ConversionDetail entity instance. |
| `ConversionDetailMerchant` | `(data) -> ConversionDetailMerchantEntity` | Create a ConversionDetailMerchant entity instance. |
| `ConversionGeneral` | `(data) -> ConversionGeneralEntity` | Create a ConversionGeneral entity instance. |
| `ConversionStatus` | `(data) -> ConversionStatusEntity` | Create a ConversionStatus entity instance. |
| `Deeplink` | `(data) -> DeeplinkEntity` | Create a Deeplink entity instance. |
| `DeeplinkMerchant` | `(data) -> DeeplinkMerchantEntity` | Create a DeeplinkMerchant entity instance. |
| `Dnt` | `(data) -> DntEntity` | Create a Dnt entity instance. |
| `Market` | `(data) -> MarketEntity` | Create a Market entity instance. |
| `Merchant` | `(data) -> MerchantEntity` | Create a Merchant entity instance. |
| `Offer` | `(data) -> OfferEntity` | Create a Offer entity instance. |
| `ReportDetail` | `(data) -> ReportDetailEntity` | Create a ReportDetail entity instance. |
| `ReportGeneral` | `(data) -> ReportGeneralEntity` | Create a ReportGeneral entity instance. |
| `ReportModified` | `(data) -> ReportModifiedEntity` | Create a ReportModified entity instance. |
| `ReportStatus` | `(data) -> ReportStatusEntity` | Create a ReportStatus entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`table` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `boolean` | `true` if the HTTP status is 2xx. |
| `status` | `number` | HTTP status code. |
| `headers` | `table` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

### Entities

#### ConversionDetail

| Field | Description |
| --- | --- |
| `click_id` |  |
| `date` |  |
| `market` |  |
| `merchant` |  |
| `placement_id` |  |
| `sale` |  |

Operations: List.

API path: `/v2/conversion/detail`

#### ConversionDetailMerchant

| Field | Description |
| --- | --- |
| `click` |  |
| `market` |  |
| `merchant` |  |
| `sale` |  |

Operations: List.

API path: `/v2/conversion/detail/merchant`

#### ConversionGeneral

| Field | Description |
| --- | --- |
| `date` |  |
| `market` |  |
| `total` |  |

Operations: Load.

API path: `/v2/conversion/general`

#### ConversionStatus

| Field | Description |
| --- | --- |
| `status` |  |

Operations: Load.

API path: `/v2/conversion/status`

#### Deeplink

| Field | Description |
| --- | --- |
| `is_couponing` |  |
| `market` |  |
| `placement_id` |  |
| `result` |  |
| `url` |  |

Operations: Create.

API path: `/v2/deeplink`

#### DeeplinkMerchant

| Field | Description |
| --- | --- |
| `deeplink_count` |  |
| `estimated_cpc` |  |
| `has_external_homepage` |  |
| `has_smartlink_homepage` |  |
| `id` |  |
| `is_smartlink` |  |
| `logo` |  |
| `name` |  |
| `traffic_type` |  |

Operations: List.

API path: `/v2/deeplink/merchant`

#### Dnt

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/v2/d`

#### Market

| Field | Description |
| --- | --- |
| `id` |  |

Operations: List.

API path: `/v2/markets`

#### Merchant

| Field | Description |
| --- | --- |
| `id` |  |
| `logo` |  |
| `name` |  |
| `offer_count` |  |
| `traffic_type` |  |

Operations: List.

API path: `/v2/merchant`

#### Offer

| Field | Description |
| --- | --- |
| `availability` |  |
| `brand` |  |
| `click_url` |  |
| `description` |  |
| `ean` |  |
| `eer` |  |
| `estimated_cpc` |  |
| `id` |  |
| `image` |  |
| `merchant` |  |
| `original_price` |  |
| `price` |  |
| `promo_text` |  |
| `shipping_price` |  |
| `shipping_time` |  |
| `thumbnail` |  |
| `title` |  |
| `unit_price` |  |

Operations: List, Load.

API path: `/v2/offer`

#### ReportDetail

| Field | Description |
| --- | --- |
| `click_id` |  |
| `currency` |  |
| `date` |  |
| `market` |  |
| `merchant` |  |
| `placement_id` |  |
| `revenue` |  |

Operations: List.

API path: `/v2/report/detail`

#### ReportGeneral

| Field | Description |
| --- | --- |
| `date` |  |
| `market` |  |
| `total` |  |

Operations: Load.

API path: `/v2/report/general`

#### ReportModified

| Field | Description |
| --- | --- |
| `market` |  |

Operations: Load.

API path: `/v2/report/modified`

#### ReportStatus

| Field | Description |
| --- | --- |
| `status` |  |

Operations: Load.

API path: `/v2/report/status`



## Entities


### ConversionDetail

Create an instance: `const conversion_detail = client.ConversionDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `click_id` | ``$STRING`` |  |
| `date` | ``$STRING`` |  |
| `market` | ``$STRING`` |  |
| `merchant` | ``$OBJECT`` |  |
| `placement_id` | ``$STRING`` |  |
| `sale` | ``$NUMBER`` |  |

#### Example: List

```ts
const conversion_details = await client.ConversionDetail().list()
```


### ConversionDetailMerchant

Create an instance: `const conversion_detail_merchant = client.ConversionDetailMerchant()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `click` | ``$INTEGER`` |  |
| `market` | ``$STRING`` |  |
| `merchant` | ``$OBJECT`` |  |
| `sale` | ``$INTEGER`` |  |

#### Example: List

```ts
const conversion_detail_merchants = await client.ConversionDetailMerchant().list()
```


### ConversionGeneral

Create an instance: `const conversion_general = client.ConversionGeneral()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | ``$OBJECT`` |  |
| `market` | ``$OBJECT`` |  |
| `total` | ``$OBJECT`` |  |

#### Example: Load

```ts
const conversion_general = await client.ConversionGeneral().load({ id: 'conversion_general_id' })
```


### ConversionStatus

Create an instance: `const conversion_status = client.ConversionStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | ``$STRING`` |  |

#### Example: Load

```ts
const conversion_status = await client.ConversionStatus().load({ id: 'conversion_status_id' })
```


### Deeplink

Create an instance: `const deeplink = client.Deeplink()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `is_couponing` | ``$BOOLEAN`` |  |
| `market` | ``$STRING`` |  |
| `placement_id` | ``$STRING`` |  |
| `result` | ``$OBJECT`` |  |
| `url` | ``$ARRAY`` |  |

#### Example: Create

```ts
const deeplink = await client.Deeplink().create({
  market: /* `$STRING` */,
  url: /* `$ARRAY` */,
})
```


### DeeplinkMerchant

Create an instance: `const deeplink_merchant = client.DeeplinkMerchant()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deeplink_count` | ``$INTEGER`` |  |
| `estimated_cpc` | ``$OBJECT`` |  |
| `has_external_homepage` | ``$BOOLEAN`` |  |
| `has_smartlink_homepage` | ``$BOOLEAN`` |  |
| `id` | ``$STRING`` |  |
| `is_smartlink` | ``$BOOLEAN`` |  |
| `logo` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `traffic_type` | ``$ARRAY`` |  |

#### Example: List

```ts
const deeplink_merchants = await client.DeeplinkMerchant().list()
```


### Dnt

Create an instance: `const dnt = client.Dnt()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const dnt = await client.Dnt().load({ id: 'dnt_id' })
```


### Market

Create an instance: `const market = client.Market()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$STRING`` |  |

#### Example: List

```ts
const markets = await client.Market().list()
```


### Merchant

Create an instance: `const merchant = client.Merchant()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$STRING`` |  |
| `logo` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `offer_count` | ``$INTEGER`` |  |
| `traffic_type` | ``$ARRAY`` |  |

#### Example: List

```ts
const merchants = await client.Merchant().list()
```


### Offer

Create an instance: `const offer = client.Offer()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability` | ``$STRING`` |  |
| `brand` | ``$STRING`` |  |
| `click_url` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `ean` | ``$OBJECT`` |  |
| `eer` | ``$STRING`` |  |
| `estimated_cpc` | ``$OBJECT`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$OBJECT`` |  |
| `merchant` | ``$OBJECT`` |  |
| `original_price` | ``$OBJECT`` |  |
| `price` | ``$OBJECT`` |  |
| `promo_text` | ``$STRING`` |  |
| `shipping_price` | ``$OBJECT`` |  |
| `shipping_time` | ``$OBJECT`` |  |
| `thumbnail` | ``$OBJECT`` |  |
| `title` | ``$STRING`` |  |
| `unit_price` | ``$OBJECT`` |  |

#### Example: Load

```ts
const offer = await client.Offer().load({ id: 'offer_id' })
```

#### Example: List

```ts
const offers = await client.Offer().list()
```


### ReportDetail

Create an instance: `const report_detail = client.ReportDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `click_id` | ``$STRING`` |  |
| `currency` | ``$STRING`` |  |
| `date` | ``$STRING`` |  |
| `market` | ``$STRING`` |  |
| `merchant` | ``$OBJECT`` |  |
| `placement_id` | ``$STRING`` |  |
| `revenue` | ``$NUMBER`` |  |

#### Example: List

```ts
const report_details = await client.ReportDetail().list()
```


### ReportGeneral

Create an instance: `const report_general = client.ReportGeneral()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | ``$OBJECT`` |  |
| `market` | ``$OBJECT`` |  |
| `total` | ``$OBJECT`` |  |

#### Example: Load

```ts
const report_general = await client.ReportGeneral().load({ id: 'report_general_id' })
```


### ReportModified

Create an instance: `const report_modified = client.ReportModified()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `market` | ``$OBJECT`` |  |

#### Example: Load

```ts
const report_modified = await client.ReportModified().load({ id: 'report_modified_id' })
```


### ReportStatus

Create an instance: `const report_status = client.ReportStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | ``$STRING`` |  |

#### Example: Load

```ts
const report_status = await client.ReportStatus().load({ id: 'report_status_id' })
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
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── yadore-publisher_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`yadore-publisher_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local moon = client:Moon(nil)
moon:load({ planet_id = "earth", id = "luna" }, nil)

-- moon:data_get() now returns the loaded moon data
-- moon:match_get() returns the last match criteria
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
