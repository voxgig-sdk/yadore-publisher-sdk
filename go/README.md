# YadorePublisher Golang SDK

The Golang SDK for the YadorePublisher API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/yadore-publisher-sdk
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/yadore-publisher-sdk=../path/to/github.com/voxgig-sdk/yadore-publisher-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/yadore-publisher-sdk"
    "github.com/voxgig-sdk/yadore-publisher-sdk/core"
)

func main() {
    client := sdk.NewYadorePublisherSDK(map[string]any{
        "apikey": os.Getenv("YADORE-PUBLISHER_APIKEY"),
    })
```

### 2. List conversiondetails

```go
    result, err := client.ConversionDetail(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewYadorePublisherSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
YADORE-PUBLISHER_TEST_LIVE=TRUE
YADORE-PUBLISHER_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewYadorePublisherSDK

```go
func NewYadorePublisherSDK(options map[string]any) *YadorePublisherSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *YadorePublisherSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### YadorePublisherSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `ConversionDetail` | `(data map[string]any) YadorePublisherEntity` | Create a ConversionDetail entity instance. |
| `ConversionDetailMerchant` | `(data map[string]any) YadorePublisherEntity` | Create a ConversionDetailMerchant entity instance. |
| `ConversionGeneral` | `(data map[string]any) YadorePublisherEntity` | Create a ConversionGeneral entity instance. |
| `ConversionStatus` | `(data map[string]any) YadorePublisherEntity` | Create a ConversionStatus entity instance. |
| `Deeplink` | `(data map[string]any) YadorePublisherEntity` | Create a Deeplink entity instance. |
| `DeeplinkMerchant` | `(data map[string]any) YadorePublisherEntity` | Create a DeeplinkMerchant entity instance. |
| `Dnt` | `(data map[string]any) YadorePublisherEntity` | Create a Dnt entity instance. |
| `Market` | `(data map[string]any) YadorePublisherEntity` | Create a Market entity instance. |
| `Merchant` | `(data map[string]any) YadorePublisherEntity` | Create a Merchant entity instance. |
| `Offer` | `(data map[string]any) YadorePublisherEntity` | Create a Offer entity instance. |
| `ReportDetail` | `(data map[string]any) YadorePublisherEntity` | Create a ReportDetail entity instance. |
| `ReportGeneral` | `(data map[string]any) YadorePublisherEntity` | Create a ReportGeneral entity instance. |
| `ReportModified` | `(data map[string]any) YadorePublisherEntity` | Create a ReportModified entity instance. |
| `ReportStatus` | `(data map[string]any) YadorePublisherEntity` | Create a ReportStatus entity instance. |

### Entity interface (YadorePublisherEntity)

All entities implement the `YadorePublisherEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### ConversionDetail

| Field | Description |
| --- | --- |
| `"click_id"` |  |
| `"date"` |  |
| `"market"` |  |
| `"merchant"` |  |
| `"placement_id"` |  |
| `"sale"` |  |

Operations: List.

API path: `/v2/conversion/detail`

#### ConversionDetailMerchant

| Field | Description |
| --- | --- |
| `"click"` |  |
| `"market"` |  |
| `"merchant"` |  |
| `"sale"` |  |

Operations: List.

API path: `/v2/conversion/detail/merchant`

#### ConversionGeneral

| Field | Description |
| --- | --- |
| `"date"` |  |
| `"market"` |  |
| `"total"` |  |

Operations: Load.

API path: `/v2/conversion/general`

#### ConversionStatus

| Field | Description |
| --- | --- |
| `"status"` |  |

Operations: Load.

API path: `/v2/conversion/status`

#### Deeplink

| Field | Description |
| --- | --- |
| `"is_couponing"` |  |
| `"market"` |  |
| `"placement_id"` |  |
| `"result"` |  |
| `"url"` |  |

Operations: Create.

API path: `/v2/deeplink`

#### DeeplinkMerchant

| Field | Description |
| --- | --- |
| `"deeplink_count"` |  |
| `"estimated_cpc"` |  |
| `"has_external_homepage"` |  |
| `"has_smartlink_homepage"` |  |
| `"id"` |  |
| `"is_smartlink"` |  |
| `"logo"` |  |
| `"name"` |  |
| `"traffic_type"` |  |

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
| `"id"` |  |

Operations: List.

API path: `/v2/markets`

#### Merchant

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"logo"` |  |
| `"name"` |  |
| `"offer_count"` |  |
| `"traffic_type"` |  |

Operations: List.

API path: `/v2/merchant`

#### Offer

| Field | Description |
| --- | --- |
| `"availability"` |  |
| `"brand"` |  |
| `"click_url"` |  |
| `"description"` |  |
| `"ean"` |  |
| `"eer"` |  |
| `"estimated_cpc"` |  |
| `"id"` |  |
| `"image"` |  |
| `"merchant"` |  |
| `"original_price"` |  |
| `"price"` |  |
| `"promo_text"` |  |
| `"shipping_price"` |  |
| `"shipping_time"` |  |
| `"thumbnail"` |  |
| `"title"` |  |
| `"unit_price"` |  |

Operations: List, Load.

API path: `/v2/offer`

#### ReportDetail

| Field | Description |
| --- | --- |
| `"click_id"` |  |
| `"currency"` |  |
| `"date"` |  |
| `"market"` |  |
| `"merchant"` |  |
| `"placement_id"` |  |
| `"revenue"` |  |

Operations: List.

API path: `/v2/report/detail`

#### ReportGeneral

| Field | Description |
| --- | --- |
| `"date"` |  |
| `"market"` |  |
| `"total"` |  |

Operations: Load.

API path: `/v2/report/general`

#### ReportModified

| Field | Description |
| --- | --- |
| `"market"` |  |

Operations: Load.

API path: `/v2/report/modified`

#### ReportStatus

| Field | Description |
| --- | --- |
| `"status"` |  |

Operations: Load.

API path: `/v2/report/status`



## Entities


### ConversionDetail

Create an instance: `conversion_detail := client.ConversionDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
results, err := client.ConversionDetail(nil).List(nil, nil)
```


### ConversionDetailMerchant

Create an instance: `conversion_detail_merchant := client.ConversionDetailMerchant(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `click` | ``$INTEGER`` |  |
| `market` | ``$STRING`` |  |
| `merchant` | ``$OBJECT`` |  |
| `sale` | ``$INTEGER`` |  |

#### Example: List

```go
results, err := client.ConversionDetailMerchant(nil).List(nil, nil)
```


### ConversionGeneral

Create an instance: `conversion_general := client.ConversionGeneral(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | ``$OBJECT`` |  |
| `market` | ``$OBJECT`` |  |
| `total` | ``$OBJECT`` |  |

#### Example: Load

```go
result, err := client.ConversionGeneral(nil).Load(map[string]any{"id": "conversion_general_id"}, nil)
```


### ConversionStatus

Create an instance: `conversion_status := client.ConversionStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.ConversionStatus(nil).Load(map[string]any{"id": "conversion_status_id"}, nil)
```


### Deeplink

Create an instance: `deeplink := client.Deeplink(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `is_couponing` | ``$BOOLEAN`` |  |
| `market` | ``$STRING`` |  |
| `placement_id` | ``$STRING`` |  |
| `result` | ``$OBJECT`` |  |
| `url` | ``$ARRAY`` |  |

#### Example: Create

```go
result, err := client.Deeplink(nil).Create(map[string]any{
    "market": /* `$STRING` */,
    "url": /* `$ARRAY` */,
}, nil)
```


### DeeplinkMerchant

Create an instance: `deeplink_merchant := client.DeeplinkMerchant(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
results, err := client.DeeplinkMerchant(nil).List(nil, nil)
```


### Dnt

Create an instance: `dnt := client.Dnt(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.Dnt(nil).Load(map[string]any{"id": "dnt_id"}, nil)
```


### Market

Create an instance: `market := client.Market(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Market(nil).List(nil, nil)
```


### Merchant

Create an instance: `merchant := client.Merchant(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$STRING`` |  |
| `logo` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `offer_count` | ``$INTEGER`` |  |
| `traffic_type` | ``$ARRAY`` |  |

#### Example: List

```go
results, err := client.Merchant(nil).List(nil, nil)
```


### Offer

Create an instance: `offer := client.Offer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Offer(nil).Load(map[string]any{"id": "offer_id"}, nil)
```

#### Example: List

```go
results, err := client.Offer(nil).List(nil, nil)
```


### ReportDetail

Create an instance: `report_detail := client.ReportDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
results, err := client.ReportDetail(nil).List(nil, nil)
```


### ReportGeneral

Create an instance: `report_general := client.ReportGeneral(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | ``$OBJECT`` |  |
| `market` | ``$OBJECT`` |  |
| `total` | ``$OBJECT`` |  |

#### Example: Load

```go
result, err := client.ReportGeneral(nil).Load(map[string]any{"id": "report_general_id"}, nil)
```


### ReportModified

Create an instance: `report_modified := client.ReportModified(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `market` | ``$OBJECT`` |  |

#### Example: Load

```go
result, err := client.ReportModified(nil).Load(map[string]any{"id": "report_modified_id"}, nil)
```


### ReportStatus

Create an instance: `report_status := client.ReportStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.ReportStatus(nil).Load(map[string]any{"id": "report_status_id"}, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/yadore-publisher-sdk/
├── yadore-publisher.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/yadore-publisher-sdk`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
