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
local conversion_detail = client:ConversionDetail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `click_id` | `string` | No |  |
| `date` | `string` | No |  |
| `market` | `string` | No |  |
| `merchant` | `table` | No |  |
| `placement_id` | `string` | No |  |
| `sale` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ConversionDetail():list()
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
local conversion_detail_merchant = client:ConversionDetailMerchant(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `click` | `number` | No |  |
| `market` | `string` | No |  |
| `merchant` | `table` | No |  |
| `sale` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ConversionDetailMerchant():list()
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
local conversion_general = client:ConversionGeneral(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `table` | No |  |
| `market` | `table` | No |  |
| `total` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ConversionGeneral():load()
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
local conversion_status = client:ConversionStatus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ConversionStatus():load()
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
local deeplink = client:Deeplink(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_couponing` | `boolean` | No |  |
| `market` | `string` | Yes |  |
| `placement_id` | `string` | No |  |
| `result` | `table` | No |  |
| `url` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Deeplink():create({
  market = --[[ string ]],
  url = --[[ table ]],
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
local deeplink_merchant = client:DeeplinkMerchant(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deeplink_count` | `number` | No |  |
| `estimated_cpc` | `table` | No |  |
| `has_external_homepage` | `boolean` | No |  |
| `has_smartlink_homepage` | `boolean` | No |  |
| `id` | `string` | No |  |
| `is_smartlink` | `boolean` | No |  |
| `logo` | `table` | No |  |
| `name` | `string` | No |  |
| `traffic_type` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:DeeplinkMerchant():list()
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
local dnt = client:Dnt(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Dnt():load()
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
local market = client:Market(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Market():list()
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
local merchant = client:Merchant(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `logo` | `table` | No |  |
| `name` | `string` | No |  |
| `offer_count` | `number` | No |  |
| `traffic_type` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Merchant():list()
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
local offer = client:Offer(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability` | `string` | No |  |
| `brand` | `string` | No |  |
| `click_url` | `string` | No |  |
| `description` | `string` | No |  |
| `ean` | `table` | No |  |
| `eer` | `string` | No |  |
| `estimated_cpc` | `table` | No |  |
| `id` | `string` | No |  |
| `image` | `table` | No |  |
| `merchant` | `table` | No |  |
| `original_price` | `table` | No |  |
| `price` | `table` | No |  |
| `promo_text` | `string` | No |  |
| `shipping_price` | `table` | No |  |
| `shipping_time` | `table` | No |  |
| `thumbnail` | `table` | No |  |
| `title` | `string` | No |  |
| `unit_price` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Offer():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Offer():load({ id = "offer_id" })
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
local report_detail = client:ReportDetail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `click_id` | `string` | No |  |
| `currency` | `string` | No |  |
| `date` | `string` | No |  |
| `market` | `string` | No |  |
| `merchant` | `table` | No |  |
| `placement_id` | `string` | No |  |
| `revenue` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ReportDetail():list()
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
local report_general = client:ReportGeneral(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `table` | No |  |
| `market` | `table` | No |  |
| `total` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ReportGeneral():load()
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
local report_modified = client:ReportModified(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `market` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ReportModified():load()
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
local report_status = client:ReportStatus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ReportStatus():load()
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

