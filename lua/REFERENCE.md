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
| `clickId` | `string` | No |  |
| `date` | `string` | No |  |
| `market` | `string` | No |  |
| `merchant` | `table` | No |  |
| `placementId` | `string` | No |  |
| `sales` | `number` | No |  |

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
| `clicks` | `number` | No |  |
| `market` | `string` | No | Two character form of a country, in all lower-case |
| `merchant` | `table` | No |  |
| `sales` | `number` | No |  |

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
local result, err = client:ConversionGeneral():load({ format = "format", from = "from", to = "to" })
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
local result, err = client:ConversionStatus():load({ date = "date" })
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
| `deeplinks` | `table` | No |  |
| `found` | `number` | No |  |
| `isCouponing` | `boolean` | No | If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not. |
| `market` | `string` | Yes | The market to query. |
| `placementId` | `string` | No | Your own subID for your click-tracking. |
| `total` | `number` | No |  |
| `urls` | `table` | Yes | An array of URLs |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Deeplink():create({
  market = --[[ string ]],
  urls = --[[ table ]],
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
| `deeplinkCount` | `number` | No | Even when a merchant has no deeplinks, it might still have smartlinks. |
| `estimatedCpc` | `table` | No |  |
| `hasExternalHomepage` | `boolean` | No | If the merchant accept homepage deeplinks. |
| `hasSmartlinkHomepage` | `boolean` | No | If the merchant accept homepage smartlinks. |
| `id` | `string` | No |  |
| `isSmartlink` | `boolean` | No | If the merchant has one or more smartlinks. |
| `logo` | `table` | No |  |
| `name` | `string` | No |  |
| `trafficTypes` | `table` | No |  |

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
local result, err = client:Dnt():load({ market = "market", project_id = "project_id", url = "url" })
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
| `offerCount` | `number` | No |  |
| `trafficTypes` | `table` | No |  |

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
| `clickUrl` | `string` | No |  |
| `count` | `number` | No |  |
| `description` | `string` | No |  |
| `eer` | `string` | No |  |
| `estimatedCpc` | `table` | No | estimatedCPC means the gross revenue per click Yadore gets from its merchants, you have to use your revenue share to get your estimatedCPC. |
| `id` | `string` | No |  |
| `image` | `table` | No |  |
| `merchant` | `table` | No |  |
| `offers` | `table` | No |  |
| `originalPrice` | `table` | No |  |
| `price` | `table` | No |  |
| `promoText` | `string` | No |  |
| `shippingPrice` | `table` | No |  |
| `shippingTime` | `table` | No |  |
| `thumbnail` | `table` | No |  |
| `title` | `string` | No |  |
| `unitPrice` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Offer():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Offer():load({ ean = "ean", market = "market" })
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
| `clickId` | `string` | No |  |
| `currency` | `string` | No |  |
| `date` | `string` | No |  |
| `market` | `string` | No |  |
| `merchant` | `table` | No |  |
| `placementId` | `string` | No |  |
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
local result, err = client:ReportGeneral():load({ date = "date", format = "format" })
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
| `date` | `string` | No |  |
| `modifiedDate` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ReportModified():load({ from = "from", to = "to" })
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
local result, err = client:ReportStatus():load({ date = "date" })
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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

