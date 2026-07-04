# YadorePublisher Ruby SDK



The Ruby SDK for the YadorePublisher API — an entity-oriented client using idiomatic Ruby conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/yadore-publisher-sdk/releases](https://github.com/voxgig-sdk/yadore-publisher-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "YadorePublisher_sdk"

client = YadorePublisherSDK.new({
  "apikey" => ENV["YADORE_PUBLISHER_APIKEY"],
})
```

### 2. List conversiondetails

```ruby
begin
  result = client.conversiondetail.list
  if result.is_a?(Array)
    result.each do |item|
      d = item.data_get
      puts "#{d["id"]} #{d["name"]}"
    end
  end
rescue => err
  warn "list failed: #{err}"
end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  warn result["err"]
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = YadorePublisherSDK.test

result = client.conversiondetail.load({ "id" => "test01" })
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = YadorePublisherSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
YADORE_PUBLISHER_TEST_LIVE=TRUE
YADORE_PUBLISHER_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### YadorePublisherSDK

```ruby
require_relative "YadorePublisher_sdk"
client = YadorePublisherSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = YadorePublisherSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### YadorePublisherSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> Array` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `YadorePublisherError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `const conversion_detail = client.conversion_detail`

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
const conversion_details = await client.conversion_detail.list()
```


### ConversionDetailMerchant

Create an instance: `const conversion_detail_merchant = client.conversion_detail_merchant`

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
const conversion_detail_merchants = await client.conversion_detail_merchant.list()
```


### ConversionGeneral

Create an instance: `const conversion_general = client.conversion_general`

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
const conversion_general = await client.conversion_general.load({ id: 'conversion_general_id' })
```


### ConversionStatus

Create an instance: `const conversion_status = client.conversion_status`

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
const conversion_status = await client.conversion_status.load({ id: 'conversion_status_id' })
```


### Deeplink

Create an instance: `const deeplink = client.deeplink`

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
const deeplink = await client.deeplink.create({
  market: /* `$STRING` */,
  url: /* `$ARRAY` */,
})
```


### DeeplinkMerchant

Create an instance: `const deeplink_merchant = client.deeplink_merchant`

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
const deeplink_merchants = await client.deeplink_merchant.list()
```


### Dnt

Create an instance: `const dnt = client.dnt`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const dnt = await client.dnt.load({ id: 'dnt_id' })
```


### Market

Create an instance: `const market = client.market`

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
const markets = await client.market.list()
```


### Merchant

Create an instance: `const merchant = client.merchant`

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
const merchants = await client.merchant.list()
```


### Offer

Create an instance: `const offer = client.offer`

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
const offer = await client.offer.load({ id: 'offer_id' })
```

#### Example: List

```ts
const offers = await client.offer.list()
```


### ReportDetail

Create an instance: `const report_detail = client.report_detail`

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
const report_details = await client.report_detail.list()
```


### ReportGeneral

Create an instance: `const report_general = client.report_general`

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
const report_general = await client.report_general.load({ id: 'report_general_id' })
```


### ReportModified

Create an instance: `const report_modified = client.report_modified`

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
const report_modified = await client.report_modified.load({ id: 'report_modified_id' })
```


### ReportStatus

Create an instance: `const report_status = client.report_status`

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
const report_status = await client.report_status.load({ id: 'report_status_id' })
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── YadorePublisher_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`YadorePublisher_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
conversiondetail = client.conversiondetail
conversiondetail.load({ "id" => "example_id" })

# conversiondetail.data_get now returns the loaded conversiondetail data
# conversiondetail.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
