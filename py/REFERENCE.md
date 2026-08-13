# YadorePublisher Python SDK Reference

Complete API reference for the YadorePublisher Python SDK.


## YadorePublisherSDK

### Constructor

```python
from yadorepublisher_sdk import YadorePublisherSDK

client = YadorePublisherSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `YadorePublisherSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = YadorePublisherSDK.test()
```


### Instance Methods

#### `ConversionDetail(data=None)`

Create a new `ConversionDetailEntity` instance. Pass `None` for no initial data.

#### `ConversionDetailMerchant(data=None)`

Create a new `ConversionDetailMerchantEntity` instance. Pass `None` for no initial data.

#### `ConversionGeneral(data=None)`

Create a new `ConversionGeneralEntity` instance. Pass `None` for no initial data.

#### `ConversionStatus(data=None)`

Create a new `ConversionStatusEntity` instance. Pass `None` for no initial data.

#### `Deeplink(data=None)`

Create a new `DeeplinkEntity` instance. Pass `None` for no initial data.

#### `DeeplinkMerchant(data=None)`

Create a new `DeeplinkMerchantEntity` instance. Pass `None` for no initial data.

#### `Dnt(data=None)`

Create a new `DntEntity` instance. Pass `None` for no initial data.

#### `Market(data=None)`

Create a new `MarketEntity` instance. Pass `None` for no initial data.

#### `Merchant(data=None)`

Create a new `MerchantEntity` instance. Pass `None` for no initial data.

#### `Offer(data=None)`

Create a new `OfferEntity` instance. Pass `None` for no initial data.

#### `ReportDetail(data=None)`

Create a new `ReportDetailEntity` instance. Pass `None` for no initial data.

#### `ReportGeneral(data=None)`

Create a new `ReportGeneralEntity` instance. Pass `None` for no initial data.

#### `ReportModified(data=None)`

Create a new `ReportModifiedEntity` instance. Pass `None` for no initial data.

#### `ReportStatus(data=None)`

Create a new `ReportStatusEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ConversionDetailEntity

```python
conversion_detail = client.ConversionDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clickId` | `str` | No |  |
| `date` | `str` | No |  |
| `market` | `str` | No |  |
| `merchant` | `dict` | No |  |
| `placementId` | `str` | No |  |
| `sales` | `float` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ConversionDetail().list()
for conversion_detail in results:
    print(conversion_detail)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConversionDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConversionDetailMerchantEntity

```python
conversion_detail_merchant = client.ConversionDetailMerchant()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clicks` | `int` | No |  |
| `market` | `str` | No |  |
| `merchant` | `dict` | No |  |
| `sales` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ConversionDetailMerchant().list()
for conversion_detail_merchant in results:
    print(conversion_detail_merchant)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConversionDetailMerchantEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConversionGeneralEntity

```python
conversion_general = client.ConversionGeneral()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `dict` | No |  |
| `market` | `dict` | No |  |
| `total` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ConversionGeneral().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConversionGeneralEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConversionStatusEntity

```python
conversion_status = client.ConversionStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ConversionStatus().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConversionStatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeeplinkEntity

```python
deeplink = client.Deeplink()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deeplinks` | `list` | No |  |
| `found` | `int` | No |  |
| `isCouponing` | `bool` | No |  |
| `market` | `str` | Yes |  |
| `placementId` | `str` | No |  |
| `total` | `int` | No |  |
| `urls` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Deeplink().create({
    "market": "example_market",  # str
    "urls": [],  # list
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeeplinkEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeeplinkMerchantEntity

```python
deeplink_merchant = client.DeeplinkMerchant()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deeplinkCount` | `int` | No |  |
| `estimatedCpc` | `dict` | No |  |
| `hasExternalHomepage` | `bool` | No |  |
| `hasSmartlinkHomepage` | `bool` | No |  |
| `id` | `str` | No |  |
| `isSmartlink` | `bool` | No |  |
| `logo` | `dict` | No |  |
| `name` | `str` | No |  |
| `trafficTypes` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DeeplinkMerchant().list()
for deeplink_merchant in results:
    print(deeplink_merchant)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeeplinkMerchantEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DntEntity

```python
dnt = client.Dnt()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Dnt().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DntEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MarketEntity

```python
market = client.Market()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Market().list()
for market in results:
    print(market)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarketEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MerchantEntity

```python
merchant = client.Merchant()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `logo` | `dict` | No |  |
| `name` | `str` | No |  |
| `offerCount` | `int` | No |  |
| `trafficTypes` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Merchant().list()
for merchant in results:
    print(merchant)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MerchantEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OfferEntity

```python
offer = client.Offer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability` | `str` | No |  |
| `brand` | `str` | No |  |
| `clickUrl` | `str` | No |  |
| `count` | `int` | No |  |
| `description` | `str` | No |  |
| `eer` | `str` | No |  |
| `estimatedCpc` | `dict` | No |  |
| `id` | `str` | No |  |
| `image` | `dict` | No |  |
| `merchant` | `dict` | No |  |
| `offers` | `list` | No |  |
| `originalPrice` | `dict` | No |  |
| `price` | `dict` | No |  |
| `promoText` | `str` | No |  |
| `shippingPrice` | `dict` | No |  |
| `shippingTime` | `dict` | No |  |
| `thumbnail` | `dict` | No |  |
| `title` | `str` | No |  |
| `unitPrice` | `dict` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Offer().list()
for offer in results:
    print(offer)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Offer().load({"id": "offer_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OfferEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReportDetailEntity

```python
report_detail = client.ReportDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clickId` | `str` | No |  |
| `currency` | `str` | No |  |
| `date` | `str` | No |  |
| `market` | `str` | No |  |
| `merchant` | `dict` | No |  |
| `placementId` | `str` | No |  |
| `revenue` | `float` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ReportDetail().list()
for report_detail in results:
    print(report_detail)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReportDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReportGeneralEntity

```python
report_general = client.ReportGeneral()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `dict` | No |  |
| `market` | `dict` | No |  |
| `total` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ReportGeneral().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReportGeneralEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReportModifiedEntity

```python
report_modified = client.ReportModified()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `str` | No |  |
| `modifiedDate` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ReportModified().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReportModifiedEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReportStatusEntity

```python
report_status = client.ReportStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ReportStatus().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReportStatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = YadorePublisherSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

