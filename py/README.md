# YadorePublisher Python SDK



The Python SDK for the YadorePublisher API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.ConversionDetail()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/yadore-publisher-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from yadorepublisher_sdk import YadorePublisherSDK

client = YadorePublisherSDK({
    "apikey": os.environ.get("YADORE_PUBLISHER_APIKEY"),
})
```

### 2. List conversiondetail records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    conversiondetails = client.ConversionDetail().list()
    for conversiondetail in conversiondetails:
        print(conversiondetail)
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    reportgeneral = client.ReportGeneral().load()
    print(reportgeneral)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = YadorePublisherSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
reportgeneral = client.ReportGeneral().load()
# reportgeneral contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = YadorePublisherSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### YadorePublisherSDK

```python
from yadorepublisher_sdk import YadorePublisherSDK

client = YadorePublisherSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = YadorePublisherSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### YadorePublisherSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `conversion_detail = client.ConversionDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clickId` | `str` |  |
| `date` | `str` |  |
| `market` | `str` |  |
| `merchant` | `dict` |  |
| `placementId` | `str` |  |
| `sales` | `float` |  |

#### Example: List

```python
conversion_details = client.ConversionDetail().list()
```


### ConversionDetailMerchant

Create an instance: `conversion_detail_merchant = client.ConversionDetailMerchant()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clicks` | `int` |  |
| `market` | `str` | Two character form of a country, in all lower-case |
| `merchant` | `dict` |  |
| `sales` | `int` |  |

#### Example: List

```python
conversion_detail_merchants = client.ConversionDetailMerchant().list()
```


### ConversionGeneral

Create an instance: `conversion_general = client.ConversionGeneral()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `dict` |  |
| `market` | `dict` |  |
| `total` | `dict` |  |

#### Example: Load

```python
conversion_general = client.ConversionGeneral().load()
```


### ConversionStatus

Create an instance: `conversion_status = client.ConversionStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `str` |  |

#### Example: Load

```python
conversion_status = client.ConversionStatus().load()
```


### Deeplink

Create an instance: `deeplink = client.Deeplink()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deeplinks` | `list` |  |
| `found` | `int` |  |
| `isCouponing` | `bool` | If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not. |
| `market` | `str` | The market to query. |
| `placementId` | `str` | Your own subID for your click-tracking. |
| `total` | `int` |  |
| `urls` | `list` | An array of URLs |

#### Example: Create

```python
deeplink = client.Deeplink().create({
    "market": "example_market",  # str
    "urls": [],  # list
})
```


### DeeplinkMerchant

Create an instance: `deeplink_merchant = client.DeeplinkMerchant()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deeplinkCount` | `int` | Even when a merchant has no deeplinks, it might still have smartlinks. |
| `estimatedCpc` | `dict` |  |
| `hasExternalHomepage` | `bool` | If the merchant accept homepage deeplinks. |
| `hasSmartlinkHomepage` | `bool` | If the merchant accept homepage smartlinks. |
| `id` | `str` |  |
| `isSmartlink` | `bool` | If the merchant has one or more smartlinks. |
| `logo` | `dict` |  |
| `name` | `str` |  |
| `trafficTypes` | `list` |  |

#### Example: List

```python
deeplink_merchants = client.DeeplinkMerchant().list()
```


### Dnt

Create an instance: `dnt = client.Dnt()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
dnt = client.Dnt().load()
```


### Market

Create an instance: `market = client.Market()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: List

```python
markets = client.Market().list()
```


### Merchant

Create an instance: `merchant = client.Merchant()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `logo` | `dict` |  |
| `name` | `str` |  |
| `offerCount` | `int` |  |
| `trafficTypes` | `list` |  |

#### Example: List

```python
merchants = client.Merchant().list()
```


### Offer

Create an instance: `offer = client.Offer()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability` | `str` |  |
| `brand` | `str` |  |
| `clickUrl` | `str` |  |
| `count` | `int` |  |
| `description` | `str` |  |
| `eer` | `str` |  |
| `estimatedCpc` | `dict` | estimatedCPC means the gross revenue per click Yadore gets from its merchants, you have to use your revenue share to get your estimatedCPC. |
| `id` | `str` |  |
| `image` | `dict` |  |
| `merchant` | `dict` |  |
| `offers` | `list` |  |
| `originalPrice` | `dict` |  |
| `price` | `dict` |  |
| `promoText` | `str` |  |
| `shippingPrice` | `dict` |  |
| `shippingTime` | `dict` |  |
| `thumbnail` | `dict` |  |
| `title` | `str` |  |
| `unitPrice` | `dict` |  |

#### Example: Load

```python
offer = client.Offer().load({"id": "offer_id"})
```

#### Example: List

```python
offers = client.Offer().list()
```


### ReportDetail

Create an instance: `report_detail = client.ReportDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clickId` | `str` |  |
| `currency` | `str` |  |
| `date` | `str` |  |
| `market` | `str` |  |
| `merchant` | `dict` |  |
| `placementId` | `str` |  |
| `revenue` | `float` |  |

#### Example: List

```python
report_details = client.ReportDetail().list()
```


### ReportGeneral

Create an instance: `report_general = client.ReportGeneral()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `dict` |  |
| `market` | `dict` |  |
| `total` | `dict` |  |

#### Example: Load

```python
report_general = client.ReportGeneral().load()
```


### ReportModified

Create an instance: `report_modified = client.ReportModified()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `str` |  |
| `modifiedDate` | `str` |  |

#### Example: Load

```python
report_modified = client.ReportModified().load()
```


### ReportStatus

Create an instance: `report_status = client.ReportStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `str` |  |

#### Example: Load

```python
report_status = client.ReportStatus().load()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── yadorepublisher_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`yadorepublisher_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
reportgeneral = client.ReportGeneral()
reportgeneral.load()

# reportgeneral.data_get() now returns the reportgeneral data from the last load
# reportgeneral.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
