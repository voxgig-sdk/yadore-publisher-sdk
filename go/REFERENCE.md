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
conversionDetail := client.ConversionDetail(nil)
fmt.Println(conversionDetail.GetName()) // "conversion_detail"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clickId` | `string` | No |  |
| `date` | `string` | No |  |
| `market` | `string` | No |  |
| `merchant` | `map[string]any` | No |  |
| `placementId` | `string` | No |  |
| `sales` | `float64` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ConversionDetail(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
conversionDetailMerchant := client.ConversionDetailMerchant(nil)
fmt.Println(conversionDetailMerchant.GetName()) // "conversion_detail_merchant"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clicks` | `int` | No |  |
| `market` | `string` | No |  |
| `merchant` | `map[string]any` | No |  |
| `sales` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ConversionDetailMerchant(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
conversionGeneral := client.ConversionGeneral(nil)
fmt.Println(conversionGeneral.GetName()) // "conversion_general"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `map[string]any` | No |  |
| `market` | `map[string]any` | No |  |
| `total` | `map[string]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ConversionGeneral(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
conversionStatus := client.ConversionStatus(nil)
fmt.Println(conversionStatus.GetName()) // "conversion_status"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ConversionStatus(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(deeplink.GetName()) // "deeplink"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deeplinks` | `[]any` | No |  |
| `found` | `int` | No |  |
| `isCouponing` | `bool` | No |  |
| `market` | `string` | Yes |  |
| `placementId` | `string` | No |  |
| `total` | `int` | No |  |
| `urls` | `[]any` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Deeplink(nil).Create(map[string]any{
    "market": "example_market",
    "urls": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
deeplinkMerchant := client.DeeplinkMerchant(nil)
fmt.Println(deeplinkMerchant.GetName()) // "deeplink_merchant"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deeplinkCount` | `int` | No |  |
| `estimatedCpc` | `map[string]any` | No |  |
| `hasExternalHomepage` | `bool` | No |  |
| `hasSmartlinkHomepage` | `bool` | No |  |
| `id` | `string` | No |  |
| `isSmartlink` | `bool` | No |  |
| `logo` | `map[string]any` | No |  |
| `name` | `string` | No |  |
| `trafficTypes` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.DeeplinkMerchant(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
fmt.Println(dnt.GetName()) // "dnt"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Dnt(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(market.GetName()) // "market"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Market(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
fmt.Println(merchant.GetName()) // "merchant"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `logo` | `map[string]any` | No |  |
| `name` | `string` | No |  |
| `offerCount` | `int` | No |  |
| `trafficTypes` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Merchant(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
fmt.Println(offer.GetName()) // "offer"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability` | `string` | No |  |
| `brand` | `string` | No |  |
| `clickUrl` | `string` | No |  |
| `count` | `int` | No |  |
| `description` | `string` | No |  |
| `eer` | `string` | No |  |
| `estimatedCpc` | `map[string]any` | No |  |
| `id` | `string` | No |  |
| `image` | `map[string]any` | No |  |
| `merchant` | `map[string]any` | No |  |
| `offers` | `[]any` | No |  |
| `originalPrice` | `map[string]any` | No |  |
| `price` | `map[string]any` | No |  |
| `promoText` | `string` | No |  |
| `shippingPrice` | `map[string]any` | No |  |
| `shippingTime` | `map[string]any` | No |  |
| `thumbnail` | `map[string]any` | No |  |
| `title` | `string` | No |  |
| `unitPrice` | `map[string]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Offer(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Offer(nil).Load(map[string]any{"id": "offer_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
reportDetail := client.ReportDetail(nil)
fmt.Println(reportDetail.GetName()) // "report_detail"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clickId` | `string` | No |  |
| `currency` | `string` | No |  |
| `date` | `string` | No |  |
| `market` | `string` | No |  |
| `merchant` | `map[string]any` | No |  |
| `placementId` | `string` | No |  |
| `revenue` | `float64` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ReportDetail(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
reportGeneral := client.ReportGeneral(nil)
fmt.Println(reportGeneral.GetName()) // "report_general"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `map[string]any` | No |  |
| `market` | `map[string]any` | No |  |
| `total` | `map[string]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ReportGeneral(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
reportModified := client.ReportModified(nil)
fmt.Println(reportModified.GetName()) // "report_modified"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No |  |
| `modifiedDate` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ReportModified(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
reportStatus := client.ReportStatus(nil)
fmt.Println(reportStatus.GetName()) // "report_status"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ReportStatus(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

