# YadorePublisher Golang SDK



The Golang SDK for the YadorePublisher API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.ConversionDetail(nil)` — each with the same small set of operations (`List`, `Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/yadore-publisher-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/yadore-publisher-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/yadore-publisher-sdk/go=../yadore-publisher-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/yadore-publisher-sdk/go"
)

func main() {
    client := sdk.NewYadorePublisherSDK(map[string]any{
        "apikey": os.Getenv("YADORE_PUBLISHER_APIKEY"),
    })

    // List conversiondetail records — the value is the array of records itself.
    conversiondetails, err := client.ConversionDetail(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range conversiondetails.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
conversiondetails, err := client.ConversionDetail(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = conversiondetails
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
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
client := sdk.Test()

conversiondetail, err := client.ConversionDetail(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(conversiondetail) // the returned mock data
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
YADORE_PUBLISHER_TEST_LIVE=TRUE
YADORE_PUBLISHER_APIKEY=<your-key>
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
| `Offer` | `(data map[string]any) YadorePublisherEntity` | Create an Offer entity instance. |
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
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    conversiondetail, err := client.ConversionDetail(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // conversiondetail is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

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
| `click_id` | `string` |  |
| `date` | `string` |  |
| `market` | `string` |  |
| `merchant` | `map[string]any` |  |
| `placement_id` | `string` |  |
| `sale` | `float64` |  |

#### Example: List

```go
conversion_details, err := client.ConversionDetail(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(conversion_details) // the array of records
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
| `click` | `int` |  |
| `market` | `string` |  |
| `merchant` | `map[string]any` |  |
| `sale` | `int` |  |

#### Example: List

```go
conversion_detail_merchants, err := client.ConversionDetailMerchant(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(conversion_detail_merchants) // the array of records
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
| `date` | `map[string]any` |  |
| `market` | `map[string]any` |  |
| `total` | `map[string]any` |  |

#### Example: Load

```go
conversion_general, err := client.ConversionGeneral(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(conversion_general) // the loaded record
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
| `status` | `string` |  |

#### Example: Load

```go
conversion_status, err := client.ConversionStatus(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(conversion_status) // the loaded record
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
| `is_couponing` | `bool` |  |
| `market` | `string` |  |
| `placement_id` | `string` |  |
| `result` | `map[string]any` |  |
| `url` | `[]any` |  |

#### Example: Create

```go
result, err := client.Deeplink(nil).Create(map[string]any{
    "market": /* string */,
    "url": /* []any */,
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
| `deeplink_count` | `int` |  |
| `estimated_cpc` | `map[string]any` |  |
| `has_external_homepage` | `bool` |  |
| `has_smartlink_homepage` | `bool` |  |
| `id` | `string` |  |
| `is_smartlink` | `bool` |  |
| `logo` | `map[string]any` |  |
| `name` | `string` |  |
| `traffic_type` | `[]any` |  |

#### Example: List

```go
deeplink_merchants, err := client.DeeplinkMerchant(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(deeplink_merchants) // the array of records
```


### Dnt

Create an instance: `dnt := client.Dnt(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
dnt, err := client.Dnt(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(dnt) // the loaded record
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
| `id` | `string` |  |

#### Example: List

```go
markets, err := client.Market(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(markets) // the array of records
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
| `id` | `string` |  |
| `logo` | `map[string]any` |  |
| `name` | `string` |  |
| `offer_count` | `int` |  |
| `traffic_type` | `[]any` |  |

#### Example: List

```go
merchants, err := client.Merchant(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(merchants) // the array of records
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
| `availability` | `string` |  |
| `brand` | `string` |  |
| `click_url` | `string` |  |
| `description` | `string` |  |
| `ean` | `map[string]any` |  |
| `eer` | `string` |  |
| `estimated_cpc` | `map[string]any` |  |
| `id` | `string` |  |
| `image` | `map[string]any` |  |
| `merchant` | `map[string]any` |  |
| `original_price` | `map[string]any` |  |
| `price` | `map[string]any` |  |
| `promo_text` | `string` |  |
| `shipping_price` | `map[string]any` |  |
| `shipping_time` | `map[string]any` |  |
| `thumbnail` | `map[string]any` |  |
| `title` | `string` |  |
| `unit_price` | `map[string]any` |  |

#### Example: Load

```go
offer, err := client.Offer(nil).Load(map[string]any{"id": "offer_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(offer) // the loaded record
```

#### Example: List

```go
offers, err := client.Offer(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(offers) // the array of records
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
| `click_id` | `string` |  |
| `currency` | `string` |  |
| `date` | `string` |  |
| `market` | `string` |  |
| `merchant` | `map[string]any` |  |
| `placement_id` | `string` |  |
| `revenue` | `float64` |  |

#### Example: List

```go
report_details, err := client.ReportDetail(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(report_details) // the array of records
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
| `date` | `map[string]any` |  |
| `market` | `map[string]any` |  |
| `total` | `map[string]any` |  |

#### Example: Load

```go
report_general, err := client.ReportGeneral(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(report_general) // the loaded record
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
| `market` | `map[string]any` |  |

#### Example: Load

```go
report_modified, err := client.ReportModified(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(report_modified) // the loaded record
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
| `status` | `string` |  |

#### Example: Load

```go
report_status, err := client.ReportStatus(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(report_status) // the loaded record
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
github.com/voxgig-sdk/yadore-publisher-sdk/go/
├── yadore-publisher.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/yadore-publisher-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
conversiondetail := client.ConversionDetail(nil)
conversiondetail.List(nil, nil)

// conversiondetail.Data() now returns the conversiondetail data from the last list
// conversiondetail.Match() returns the last match criteria
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
