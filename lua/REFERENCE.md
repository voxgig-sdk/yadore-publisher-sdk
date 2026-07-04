# YadorePublisher Lua SDK Reference

Complete API reference for the YadorePublisher Lua SDK.


## YadorePublisherSDK

### Constructor

```lua
local sdk = require("yadore-publisher_sdk")
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

#### `ConversionDetail(data)`

Create a new `ConversionDetail` entity instance. Pass `nil` for no initial data.

#### `ConversionDetailMerchant(data)`

Create a new `ConversionDetailMerchant` entity instance. Pass `nil` for no initial data.

#### `ConversionGeneral(data)`

Create a new `ConversionGeneral` entity instance. Pass `nil` for no initial data.

#### `ConversionStatus(data)`

Create a new `ConversionStatus` entity instance. Pass `nil` for no initial data.

#### `Deeplink(data)`

Create a new `Deeplink` entity instance. Pass `nil` for no initial data.

#### `DeeplinkMerchant(data)`

Create a new `DeeplinkMerchant` entity instance. Pass `nil` for no initial data.

#### `Dnt(data)`

Create a new `Dnt` entity instance. Pass `nil` for no initial data.

#### `Market(data)`

Create a new `Market` entity instance. Pass `nil` for no initial data.

#### `Merchant(data)`

Create a new `Merchant` entity instance. Pass `nil` for no initial data.

#### `Offer(data)`

Create a new `Offer` entity instance. Pass `nil` for no initial data.

#### `ReportDetail(data)`

Create a new `ReportDetail` entity instance. Pass `nil` for no initial data.

#### `ReportGeneral(data)`

Create a new `ReportGeneral` entity instance. Pass `nil` for no initial data.

#### `ReportModified(data)`

Create a new `ReportModified` entity instance. Pass `nil` for no initial data.

#### `ReportStatus(data)`

Create a new `ReportStatus` entity instance. Pass `nil` for no initial data.

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

## ConversionDetailEntity

```lua
local conversion_detail = client:conversion_detail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `click_id` | ``$STRING`` | No |  |
| `date` | ``$STRING`` | No |  |
| `market` | ``$STRING`` | No |  |
| `merchant` | ``$OBJECT`` | No |  |
| `placement_id` | ``$STRING`` | No |  |
| `sale` | ``$NUMBER`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:conversion_detail():list()
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

Create a new `ConversionDetailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ConversionDetailMerchantEntity

```lua
local conversion_detail_merchant = client:conversion_detail_merchant(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `click` | ``$INTEGER`` | No |  |
| `market` | ``$STRING`` | No |  |
| `merchant` | ``$OBJECT`` | No |  |
| `sale` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:conversion_detail_merchant():list()
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

Create a new `ConversionDetailMerchantEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ConversionGeneralEntity

```lua
local conversion_general = client:conversion_general(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | ``$OBJECT`` | No |  |
| `market` | ``$OBJECT`` | No |  |
| `total` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:conversion_general():load({ id = "conversion_general_id" })
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

Create a new `ConversionGeneralEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ConversionStatusEntity

```lua
local conversion_status = client:conversion_status(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:conversion_status():load({ id = "conversion_status_id" })
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

Create a new `ConversionStatusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DeeplinkEntity

```lua
local deeplink = client:deeplink(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_couponing` | ``$BOOLEAN`` | No |  |
| `market` | ``$STRING`` | Yes |  |
| `placement_id` | ``$STRING`` | No |  |
| `result` | ``$OBJECT`` | No |  |
| `url` | ``$ARRAY`` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:deeplink():create({
  market = --[[ `$STRING` ]],
  url = --[[ `$ARRAY` ]],
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

Create a new `DeeplinkEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DeeplinkMerchantEntity

```lua
local deeplink_merchant = client:deeplink_merchant(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deeplink_count` | ``$INTEGER`` | No |  |
| `estimated_cpc` | ``$OBJECT`` | No |  |
| `has_external_homepage` | ``$BOOLEAN`` | No |  |
| `has_smartlink_homepage` | ``$BOOLEAN`` | No |  |
| `id` | ``$STRING`` | No |  |
| `is_smartlink` | ``$BOOLEAN`` | No |  |
| `logo` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `traffic_type` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:deeplink_merchant():list()
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

Create a new `DeeplinkMerchantEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DntEntity

```lua
local dnt = client:dnt(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:dnt():load({ id = "dnt_id" })
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

Create a new `DntEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MarketEntity

```lua
local market = client:market(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:market():list()
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

Create a new `MarketEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MerchantEntity

```lua
local merchant = client:merchant(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$STRING`` | No |  |
| `logo` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `offer_count` | ``$INTEGER`` | No |  |
| `traffic_type` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:merchant():list()
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

Create a new `MerchantEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OfferEntity

```lua
local offer = client:offer(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability` | ``$STRING`` | No |  |
| `brand` | ``$STRING`` | No |  |
| `click_url` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `ean` | ``$OBJECT`` | No |  |
| `eer` | ``$STRING`` | No |  |
| `estimated_cpc` | ``$OBJECT`` | No |  |
| `id` | ``$STRING`` | No |  |
| `image` | ``$OBJECT`` | No |  |
| `merchant` | ``$OBJECT`` | No |  |
| `original_price` | ``$OBJECT`` | No |  |
| `price` | ``$OBJECT`` | No |  |
| `promo_text` | ``$STRING`` | No |  |
| `shipping_price` | ``$OBJECT`` | No |  |
| `shipping_time` | ``$OBJECT`` | No |  |
| `thumbnail` | ``$OBJECT`` | No |  |
| `title` | ``$STRING`` | No |  |
| `unit_price` | ``$OBJECT`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:offer():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:offer():load({ id = "offer_id" })
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

Create a new `OfferEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReportDetailEntity

```lua
local report_detail = client:report_detail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `click_id` | ``$STRING`` | No |  |
| `currency` | ``$STRING`` | No |  |
| `date` | ``$STRING`` | No |  |
| `market` | ``$STRING`` | No |  |
| `merchant` | ``$OBJECT`` | No |  |
| `placement_id` | ``$STRING`` | No |  |
| `revenue` | ``$NUMBER`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:report_detail():list()
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

Create a new `ReportDetailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReportGeneralEntity

```lua
local report_general = client:report_general(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | ``$OBJECT`` | No |  |
| `market` | ``$OBJECT`` | No |  |
| `total` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:report_general():load({ id = "report_general_id" })
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

Create a new `ReportGeneralEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReportModifiedEntity

```lua
local report_modified = client:report_modified(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `market` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:report_modified():load({ id = "report_modified_id" })
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

Create a new `ReportModifiedEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReportStatusEntity

```lua
local report_status = client:report_status(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:report_status():load({ id = "report_status_id" })
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

Create a new `ReportStatusEntity` instance with the same client and
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

