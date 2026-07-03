# YadorePublisher Golang SDK Reference

Complete API reference for the YadorePublisher Golang SDK.


## YadorePublisherSDK

### Constructor

```go
func NewYadorePublisherSDK(options map[string]any) *YadorePublisherSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *YadorePublisherSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *YadorePublisherSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `ConversionDetail(data map[string]any) YadorePublisherEntity`

Create a new `ConversionDetail` entity instance. Pass `nil` for no initial data.

#### `ConversionDetailMerchant(data map[string]any) YadorePublisherEntity`

Create a new `ConversionDetailMerchant` entity instance. Pass `nil` for no initial data.

#### `ConversionGeneral(data map[string]any) YadorePublisherEntity`

Create a new `ConversionGeneral` entity instance. Pass `nil` for no initial data.

#### `ConversionStatus(data map[string]any) YadorePublisherEntity`

Create a new `ConversionStatus` entity instance. Pass `nil` for no initial data.

#### `Deeplink(data map[string]any) YadorePublisherEntity`

Create a new `Deeplink` entity instance. Pass `nil` for no initial data.

#### `DeeplinkMerchant(data map[string]any) YadorePublisherEntity`

Create a new `DeeplinkMerchant` entity instance. Pass `nil` for no initial data.

#### `Dnt(data map[string]any) YadorePublisherEntity`

Create a new `Dnt` entity instance. Pass `nil` for no initial data.

#### `Market(data map[string]any) YadorePublisherEntity`

Create a new `Market` entity instance. Pass `nil` for no initial data.

#### `Merchant(data map[string]any) YadorePublisherEntity`

Create a new `Merchant` entity instance. Pass `nil` for no initial data.

#### `Offer(data map[string]any) YadorePublisherEntity`

Create a new `Offer` entity instance. Pass `nil` for no initial data.

#### `ReportDetail(data map[string]any) YadorePublisherEntity`

Create a new `ReportDetail` entity instance. Pass `nil` for no initial data.

#### `ReportGeneral(data map[string]any) YadorePublisherEntity`

Create a new `ReportGeneral` entity instance. Pass `nil` for no initial data.

#### `ReportModified(data map[string]any) YadorePublisherEntity`

Create a new `ReportModified` entity instance. Pass `nil` for no initial data.

#### `ReportStatus(data map[string]any) YadorePublisherEntity`

Create a new `ReportStatus` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ConversionDetailEntity

```go
conversion_detail := client.ConversionDetail(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ConversionDetail(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ConversionDetailEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ConversionDetailMerchantEntity

```go
conversion_detail_merchant := client.ConversionDetailMerchant(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `click` | ``$INTEGER`` | No |  |
| `market` | ``$STRING`` | No |  |
| `merchant` | ``$OBJECT`` | No |  |
| `sale` | ``$INTEGER`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ConversionDetailMerchant(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ConversionDetailMerchantEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ConversionGeneralEntity

```go
conversion_general := client.ConversionGeneral(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | ``$OBJECT`` | No |  |
| `market` | ``$OBJECT`` | No |  |
| `total` | ``$OBJECT`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ConversionGeneral(nil).Load(map[string]any{"id": "conversion_general_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ConversionGeneralEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ConversionStatusEntity

```go
conversion_status := client.ConversionStatus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | ``$STRING`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ConversionStatus(nil).Load(map[string]any{"id": "conversion_status_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ConversionStatusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DeeplinkEntity

```go
deeplink := client.Deeplink(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Deeplink(nil).Create(map[string]any{
    "market": /* `$STRING` */,
    "url": /* `$ARRAY` */,
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeeplinkEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DeeplinkMerchantEntity

```go
deeplink_merchant := client.DeeplinkMerchant(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.DeeplinkMerchant(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeeplinkMerchantEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DntEntity

```go
dnt := client.Dnt(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Dnt(nil).Load(map[string]any{"id": "dnt_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DntEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MarketEntity

```go
market := client.Market(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Market(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MarketEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MerchantEntity

```go
merchant := client.Merchant(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Merchant(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MerchantEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OfferEntity

```go
offer := client.Offer(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Offer(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Offer(nil).Load(map[string]any{"id": "offer_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OfferEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ReportDetailEntity

```go
report_detail := client.ReportDetail(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ReportDetail(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReportDetailEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ReportGeneralEntity

```go
report_general := client.ReportGeneral(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | ``$OBJECT`` | No |  |
| `market` | ``$OBJECT`` | No |  |
| `total` | ``$OBJECT`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ReportGeneral(nil).Load(map[string]any{"id": "report_general_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReportGeneralEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ReportModifiedEntity

```go
report_modified := client.ReportModified(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `market` | ``$OBJECT`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ReportModified(nil).Load(map[string]any{"id": "report_modified_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReportModifiedEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ReportStatusEntity

```go
report_status := client.ReportStatus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | ``$STRING`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ReportStatus(nil).Load(map[string]any{"id": "report_status_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReportStatusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewYadorePublisherSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

