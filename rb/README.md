# YadorePublisher Ruby SDK



The Ruby SDK for the YadorePublisher API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.ConversionDetail` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

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

### 2. List conversiondetail records

```ruby
begin
  # list returns an Array of ConversionDetail records — iterate directly.
  conversiondetails = client.ConversionDetail.list
  conversiondetails.each do |item|
    puts "#{item["clickId"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  reportgeneral = client.ReportGeneral.load()
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
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
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
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

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
reportgeneral = client.ReportGeneral.load()
puts reportgeneral
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
| `Offer` | `(data) -> OfferEntity` | Create an Offer entity instance. |
| `ReportDetail` | `(data) -> ReportDetailEntity` | Create a ReportDetail entity instance. |
| `ReportGeneral` | `(data) -> ReportGeneralEntity` | Create a ReportGeneral entity instance. |
| `ReportModified` | `(data) -> ReportModifiedEntity` | Create a ReportModified entity instance. |
| `ReportStatus` | `(data) -> ReportStatusEntity` | Create a ReportStatus entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
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
| `clickId` |  |
| `date` |  |
| `market` |  |
| `merchant` |  |
| `placementId` |  |
| `sales` |  |

Operations: List.

API path: `/v2/conversion/detail`

#### ConversionDetailMerchant

| Field | Description |
| --- | --- |
| `clicks` |  |
| `market` | Two character form of a country, in all lower-case |
| `merchant` |  |
| `sales` |  |

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
| `deeplinks` |  |
| `found` |  |
| `isCouponing` | If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not. |
| `market` | The market to query. |
| `placementId` | Your own subID for your click-tracking. |
| `total` |  |
| `urls` | An array of URLs |

Operations: Create.

API path: `/v2/deeplink`

#### DeeplinkMerchant

| Field | Description |
| --- | --- |
| `deeplinkCount` | Even when a merchant has no deeplinks, it might still have smartlinks. |
| `estimatedCpc` |  |
| `hasExternalHomepage` | If the merchant accept homepage deeplinks. |
| `hasSmartlinkHomepage` | If the merchant accept homepage smartlinks. |
| `id` |  |
| `isSmartlink` | If the merchant has one or more smartlinks. |
| `logo` |  |
| `name` |  |
| `trafficTypes` |  |

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
| `offerCount` |  |
| `trafficTypes` |  |

Operations: List.

API path: `/v2/merchant`

#### Offer

| Field | Description |
| --- | --- |
| `availability` |  |
| `brand` |  |
| `clickUrl` |  |
| `count` |  |
| `description` |  |
| `eer` |  |
| `estimatedCpc` | estimatedCPC means the gross revenue per click Yadore gets from its merchants, you have to use your revenue share to get your estimatedCPC. |
| `id` |  |
| `image` |  |
| `merchant` |  |
| `offers` |  |
| `originalPrice` |  |
| `price` |  |
| `promoText` |  |
| `shippingPrice` |  |
| `shippingTime` |  |
| `thumbnail` |  |
| `title` |  |
| `unitPrice` |  |

Operations: List, Load.

API path: `/v2/offer`

#### ReportDetail

| Field | Description |
| --- | --- |
| `clickId` |  |
| `currency` |  |
| `date` |  |
| `market` |  |
| `merchant` |  |
| `placementId` |  |
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
| `date` |  |
| `modifiedDate` |  |

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

Create an instance: `conversion_detail = client.ConversionDetail`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clickId` | `String` |  |
| `date` | `String` |  |
| `market` | `String` |  |
| `merchant` | `Hash` |  |
| `placementId` | `String` |  |
| `sales` | `Float` |  |

#### Example: List

```ruby
# list returns an Array of ConversionDetail records (raises on error).
conversion_details = client.ConversionDetail.list
```


### ConversionDetailMerchant

Create an instance: `conversion_detail_merchant = client.ConversionDetailMerchant`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clicks` | `Integer` |  |
| `market` | `String` | Two character form of a country, in all lower-case |
| `merchant` | `Hash` |  |
| `sales` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of ConversionDetailMerchant records (raises on error).
conversion_detail_merchants = client.ConversionDetailMerchant.list
```


### ConversionGeneral

Create an instance: `conversion_general = client.ConversionGeneral`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `Hash` |  |
| `market` | `Hash` |  |
| `total` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ConversionGeneral record (raises on error).
conversion_general = client.ConversionGeneral.load()
```


### ConversionStatus

Create an instance: `conversion_status = client.ConversionStatus`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ConversionStatus record (raises on error).
conversion_status = client.ConversionStatus.load()
```


### Deeplink

Create an instance: `deeplink = client.Deeplink`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deeplinks` | `Array` |  |
| `found` | `Integer` |  |
| `isCouponing` | `Boolean` | If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not. |
| `market` | `String` | The market to query. |
| `placementId` | `String` | Your own subID for your click-tracking. |
| `total` | `Integer` |  |
| `urls` | `Array` | An array of URLs |

#### Example: Create

```ruby
deeplink = client.Deeplink.create({
  "market" => "example_market", # String
  "urls" => [], # Array
})
```


### DeeplinkMerchant

Create an instance: `deeplink_merchant = client.DeeplinkMerchant`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deeplinkCount` | `Integer` | Even when a merchant has no deeplinks, it might still have smartlinks. |
| `estimatedCpc` | `Hash` |  |
| `hasExternalHomepage` | `Boolean` | If the merchant accept homepage deeplinks. |
| `hasSmartlinkHomepage` | `Boolean` | If the merchant accept homepage smartlinks. |
| `id` | `String` |  |
| `isSmartlink` | `Boolean` | If the merchant has one or more smartlinks. |
| `logo` | `Hash` |  |
| `name` | `String` |  |
| `trafficTypes` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of DeeplinkMerchant records (raises on error).
deeplink_merchants = client.DeeplinkMerchant.list
```


### Dnt

Create an instance: `dnt = client.Dnt`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Dnt record (raises on error).
dnt = client.Dnt.load()
```


### Market

Create an instance: `market = client.Market`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Market records (raises on error).
markets = client.Market.list
```


### Merchant

Create an instance: `merchant = client.Merchant`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `logo` | `Hash` |  |
| `name` | `String` |  |
| `offerCount` | `Integer` |  |
| `trafficTypes` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Merchant records (raises on error).
merchants = client.Merchant.list
```


### Offer

Create an instance: `offer = client.Offer`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability` | `String` |  |
| `brand` | `String` |  |
| `clickUrl` | `String` |  |
| `count` | `Integer` |  |
| `description` | `String` |  |
| `eer` | `String` |  |
| `estimatedCpc` | `Hash` | estimatedCPC means the gross revenue per click Yadore gets from its merchants, you have to use your revenue share to get your estimatedCPC. |
| `id` | `String` |  |
| `image` | `Hash` |  |
| `merchant` | `Hash` |  |
| `offers` | `Array` |  |
| `originalPrice` | `Hash` |  |
| `price` | `Hash` |  |
| `promoText` | `String` |  |
| `shippingPrice` | `Hash` |  |
| `shippingTime` | `Hash` |  |
| `thumbnail` | `Hash` |  |
| `title` | `String` |  |
| `unitPrice` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Offer record (raises on error).
offer = client.Offer.load({ "id" => "offer_id" })
```

#### Example: List

```ruby
# list returns an Array of Offer records (raises on error).
offers = client.Offer.list
```


### ReportDetail

Create an instance: `report_detail = client.ReportDetail`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clickId` | `String` |  |
| `currency` | `String` |  |
| `date` | `String` |  |
| `market` | `String` |  |
| `merchant` | `Hash` |  |
| `placementId` | `String` |  |
| `revenue` | `Float` |  |

#### Example: List

```ruby
# list returns an Array of ReportDetail records (raises on error).
report_details = client.ReportDetail.list
```


### ReportGeneral

Create an instance: `report_general = client.ReportGeneral`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `Hash` |  |
| `market` | `Hash` |  |
| `total` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ReportGeneral record (raises on error).
report_general = client.ReportGeneral.load()
```


### ReportModified

Create an instance: `report_modified = client.ReportModified`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `String` |  |
| `modifiedDate` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ReportModified record (raises on error).
report_modified = client.ReportModified.load()
```


### ReportStatus

Create an instance: `report_status = client.ReportStatus`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ReportStatus record (raises on error).
report_status = client.ReportStatus.load()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

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

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

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
reportgeneral = client.ReportGeneral
reportgeneral.load()

# reportgeneral.data_get now returns the reportgeneral data from the last load
# reportgeneral.match_get returns the last match criteria
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
