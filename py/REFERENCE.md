# YadorePublisher Python SDK Reference

Complete API reference for the YadorePublisher Python SDK.


## YadorePublisherSDK

### Constructor

```python
from yadore-publisher_sdk import YadorePublisherSDK

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

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## ConversionDetailEntity

```python
conversion_detail = client.ConversionDetail()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.ConversionDetail().list({})
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
| `click` | ``$INTEGER`` | No |  |
| `market` | ``$STRING`` | No |  |
| `merchant` | ``$OBJECT`` | No |  |
| `sale` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.ConversionDetailMerchant().list({})
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
| `date` | ``$OBJECT`` | No |  |
| `market` | ``$OBJECT`` | No |  |
| `total` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.ConversionGeneral().load({"id": "conversion_general_id"})
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
| `status` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.ConversionStatus().load({"id": "conversion_status_id"})
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
| `is_couponing` | ``$BOOLEAN`` | No |  |
| `market` | ``$STRING`` | Yes |  |
| `placement_id` | ``$STRING`` | No |  |
| `result` | ``$OBJECT`` | No |  |
| `url` | ``$ARRAY`` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> tuple`

Create a new entity with the given data.

```python
result, err = client.Deeplink().create({
    "market": # `$STRING`,
    "url": # `$ARRAY`,
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.DeeplinkMerchant().list({})
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

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Dnt().load({"id": "dnt_id"})
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
| `id` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Market().list({})
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
| `id` | ``$STRING`` | No |  |
| `logo` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `offer_count` | ``$INTEGER`` | No |  |
| `traffic_type` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Merchant().list({})
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Offer().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Offer().load({"id": "offer_id"})
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
| `click_id` | ``$STRING`` | No |  |
| `currency` | ``$STRING`` | No |  |
| `date` | ``$STRING`` | No |  |
| `market` | ``$STRING`` | No |  |
| `merchant` | ``$OBJECT`` | No |  |
| `placement_id` | ``$STRING`` | No |  |
| `revenue` | ``$NUMBER`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.ReportDetail().list({})
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
| `date` | ``$OBJECT`` | No |  |
| `market` | ``$OBJECT`` | No |  |
| `total` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.ReportGeneral().load({"id": "report_general_id"})
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
| `market` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.ReportModified().load({"id": "report_modified_id"})
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
| `status` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.ReportStatus().load({"id": "report_status_id"})
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

