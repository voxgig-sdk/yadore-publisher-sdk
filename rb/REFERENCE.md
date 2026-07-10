# YadorePublisher Ruby SDK Reference

Complete API reference for the YadorePublisher Ruby SDK.


## YadorePublisherSDK

### Constructor

```ruby
require_relative 'YadorePublisher_sdk'

client = YadorePublisherSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `YadorePublisherSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = YadorePublisherSDK.test
```


### Instance Methods

#### `ConversionDetail(data = nil)`

Create a new `ConversionDetail` entity instance. Pass `nil` for no initial data.

#### `ConversionDetailMerchant(data = nil)`

Create a new `ConversionDetailMerchant` entity instance. Pass `nil` for no initial data.

#### `ConversionGeneral(data = nil)`

Create a new `ConversionGeneral` entity instance. Pass `nil` for no initial data.

#### `ConversionStatus(data = nil)`

Create a new `ConversionStatus` entity instance. Pass `nil` for no initial data.

#### `Deeplink(data = nil)`

Create a new `Deeplink` entity instance. Pass `nil` for no initial data.

#### `DeeplinkMerchant(data = nil)`

Create a new `DeeplinkMerchant` entity instance. Pass `nil` for no initial data.

#### `Dnt(data = nil)`

Create a new `Dnt` entity instance. Pass `nil` for no initial data.

#### `Market(data = nil)`

Create a new `Market` entity instance. Pass `nil` for no initial data.

#### `Merchant(data = nil)`

Create a new `Merchant` entity instance. Pass `nil` for no initial data.

#### `Offer(data = nil)`

Create a new `Offer` entity instance. Pass `nil` for no initial data.

#### `ReportDetail(data = nil)`

Create a new `ReportDetail` entity instance. Pass `nil` for no initial data.

#### `ReportGeneral(data = nil)`

Create a new `ReportGeneral` entity instance. Pass `nil` for no initial data.

#### `ReportModified(data = nil)`

Create a new `ReportModified` entity instance. Pass `nil` for no initial data.

#### `ReportStatus(data = nil)`

Create a new `ReportStatus` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ConversionDetailEntity

```ruby
conversion_detail = client.ConversionDetail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `click_id` | `String` | No |  |
| `date` | `String` | No |  |
| `market` | `String` | No |  |
| `merchant` | `Hash` | No |  |
| `placement_id` | `String` | No |  |
| `sale` | `Float` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ConversionDetail.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConversionDetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ConversionDetailMerchantEntity

```ruby
conversion_detail_merchant = client.ConversionDetailMerchant
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `click` | `Integer` | No |  |
| `market` | `String` | No |  |
| `merchant` | `Hash` | No |  |
| `sale` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ConversionDetailMerchant.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConversionDetailMerchantEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ConversionGeneralEntity

```ruby
conversion_general = client.ConversionGeneral
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `Hash` | No |  |
| `market` | `Hash` | No |  |
| `total` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ConversionGeneral.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConversionGeneralEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ConversionStatusEntity

```ruby
conversion_status = client.ConversionStatus
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ConversionStatus.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConversionStatusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DeeplinkEntity

```ruby
deeplink = client.Deeplink
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_couponing` | `Boolean` | No |  |
| `market` | `String` | Yes |  |
| `placement_id` | `String` | No |  |
| `result` | `Hash` | No |  |
| `url` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Deeplink.create({
  "market" => "example_market", # String
  "url" => [], # Array
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeeplinkEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DeeplinkMerchantEntity

```ruby
deeplink_merchant = client.DeeplinkMerchant
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deeplink_count` | `Integer` | No |  |
| `estimated_cpc` | `Hash` | No |  |
| `has_external_homepage` | `Boolean` | No |  |
| `has_smartlink_homepage` | `Boolean` | No |  |
| `id` | `String` | No |  |
| `is_smartlink` | `Boolean` | No |  |
| `logo` | `Hash` | No |  |
| `name` | `String` | No |  |
| `traffic_type` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.DeeplinkMerchant.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeeplinkMerchantEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DntEntity

```ruby
dnt = client.Dnt
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Dnt.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DntEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MarketEntity

```ruby
market = client.Market
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Market.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MarketEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MerchantEntity

```ruby
merchant = client.Merchant
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `logo` | `Hash` | No |  |
| `name` | `String` | No |  |
| `offer_count` | `Integer` | No |  |
| `traffic_type` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Merchant.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MerchantEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OfferEntity

```ruby
offer = client.Offer
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability` | `String` | No |  |
| `brand` | `String` | No |  |
| `click_url` | `String` | No |  |
| `description` | `String` | No |  |
| `ean` | `Hash` | No |  |
| `eer` | `String` | No |  |
| `estimated_cpc` | `Hash` | No |  |
| `id` | `String` | No |  |
| `image` | `Hash` | No |  |
| `merchant` | `Hash` | No |  |
| `original_price` | `Hash` | No |  |
| `price` | `Hash` | No |  |
| `promo_text` | `String` | No |  |
| `shipping_price` | `Hash` | No |  |
| `shipping_time` | `Hash` | No |  |
| `thumbnail` | `Hash` | No |  |
| `title` | `String` | No |  |
| `unit_price` | `Hash` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Offer.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Offer.load({ "id" => "offer_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OfferEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ReportDetailEntity

```ruby
report_detail = client.ReportDetail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `click_id` | `String` | No |  |
| `currency` | `String` | No |  |
| `date` | `String` | No |  |
| `market` | `String` | No |  |
| `merchant` | `Hash` | No |  |
| `placement_id` | `String` | No |  |
| `revenue` | `Float` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ReportDetail.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ReportDetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ReportGeneralEntity

```ruby
report_general = client.ReportGeneral
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `Hash` | No |  |
| `market` | `Hash` | No |  |
| `total` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ReportGeneral.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ReportGeneralEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ReportModifiedEntity

```ruby
report_modified = client.ReportModified
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `market` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ReportModified.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ReportModifiedEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ReportStatusEntity

```ruby
report_status = client.ReportStatus
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ReportStatus.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ReportStatusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = YadorePublisherSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

