# YadorePublisher PHP SDK Reference

Complete API reference for the YadorePublisher PHP SDK.


## YadorePublisherSDK

### Constructor

```php
require_once __DIR__ . '/yadorepublisher_sdk.php';

$client = new YadorePublisherSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `YadorePublisherSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = YadorePublisherSDK::test();
```


### Instance Methods

#### `ConversionDetail($data = null)`

Create a new `ConversionDetailEntity` instance. Pass `null` for no initial data.

#### `ConversionDetailMerchant($data = null)`

Create a new `ConversionDetailMerchantEntity` instance. Pass `null` for no initial data.

#### `ConversionGeneral($data = null)`

Create a new `ConversionGeneralEntity` instance. Pass `null` for no initial data.

#### `ConversionStatus($data = null)`

Create a new `ConversionStatusEntity` instance. Pass `null` for no initial data.

#### `Deeplink($data = null)`

Create a new `DeeplinkEntity` instance. Pass `null` for no initial data.

#### `DeeplinkMerchant($data = null)`

Create a new `DeeplinkMerchantEntity` instance. Pass `null` for no initial data.

#### `Dnt($data = null)`

Create a new `DntEntity` instance. Pass `null` for no initial data.

#### `Market($data = null)`

Create a new `MarketEntity` instance. Pass `null` for no initial data.

#### `Merchant($data = null)`

Create a new `MerchantEntity` instance. Pass `null` for no initial data.

#### `Offer($data = null)`

Create a new `OfferEntity` instance. Pass `null` for no initial data.

#### `ReportDetail($data = null)`

Create a new `ReportDetailEntity` instance. Pass `null` for no initial data.

#### `ReportGeneral($data = null)`

Create a new `ReportGeneralEntity` instance. Pass `null` for no initial data.

#### `ReportModified($data = null)`

Create a new `ReportModifiedEntity` instance. Pass `null` for no initial data.

#### `ReportStatus($data = null)`

Create a new `ReportStatusEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): YadorePublisherUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ConversionDetailEntity

```php
$conversion_detail = $client->ConversionDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `click_id` | `string` | No |  |
| `date` | `string` | No |  |
| `market` | `string` | No |  |
| `merchant` | `array` | No |  |
| `placement_id` | `string` | No |  |
| `sale` | `float` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ConversionDetail()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ConversionDetailEntity`

Create a new `ConversionDetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ConversionDetailMerchantEntity

```php
$conversion_detail_merchant = $client->ConversionDetailMerchant();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `click` | `int` | No |  |
| `market` | `string` | No |  |
| `merchant` | `array` | No |  |
| `sale` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ConversionDetailMerchant()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ConversionDetailMerchantEntity`

Create a new `ConversionDetailMerchantEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ConversionGeneralEntity

```php
$conversion_general = $client->ConversionGeneral();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `array` | No |  |
| `market` | `array` | No |  |
| `total` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ConversionGeneral()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ConversionGeneralEntity`

Create a new `ConversionGeneralEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ConversionStatusEntity

```php
$conversion_status = $client->ConversionStatus();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ConversionStatus()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ConversionStatusEntity`

Create a new `ConversionStatusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DeeplinkEntity

```php
$deeplink = $client->Deeplink();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_couponing` | `bool` | No |  |
| `market` | `string` | Yes |  |
| `placement_id` | `string` | No |  |
| `result` | `array` | No |  |
| `url` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Deeplink()->create([
  "market" => null, // string
  "url" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeeplinkEntity`

Create a new `DeeplinkEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DeeplinkMerchantEntity

```php
$deeplink_merchant = $client->DeeplinkMerchant();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deeplink_count` | `int` | No |  |
| `estimated_cpc` | `array` | No |  |
| `has_external_homepage` | `bool` | No |  |
| `has_smartlink_homepage` | `bool` | No |  |
| `id` | `string` | No |  |
| `is_smartlink` | `bool` | No |  |
| `logo` | `array` | No |  |
| `name` | `string` | No |  |
| `traffic_type` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->DeeplinkMerchant()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeeplinkMerchantEntity`

Create a new `DeeplinkMerchantEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DntEntity

```php
$dnt = $client->Dnt();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Dnt()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DntEntity`

Create a new `DntEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MarketEntity

```php
$market = $client->Market();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Market()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MarketEntity`

Create a new `MarketEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MerchantEntity

```php
$merchant = $client->Merchant();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `logo` | `array` | No |  |
| `name` | `string` | No |  |
| `offer_count` | `int` | No |  |
| `traffic_type` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Merchant()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MerchantEntity`

Create a new `MerchantEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OfferEntity

```php
$offer = $client->Offer();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability` | `string` | No |  |
| `brand` | `string` | No |  |
| `click_url` | `string` | No |  |
| `description` | `string` | No |  |
| `ean` | `array` | No |  |
| `eer` | `string` | No |  |
| `estimated_cpc` | `array` | No |  |
| `id` | `string` | No |  |
| `image` | `array` | No |  |
| `merchant` | `array` | No |  |
| `original_price` | `array` | No |  |
| `price` | `array` | No |  |
| `promo_text` | `string` | No |  |
| `shipping_price` | `array` | No |  |
| `shipping_time` | `array` | No |  |
| `thumbnail` | `array` | No |  |
| `title` | `string` | No |  |
| `unit_price` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Offer()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Offer()->load(["id" => "offer_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OfferEntity`

Create a new `OfferEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReportDetailEntity

```php
$report_detail = $client->ReportDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `click_id` | `string` | No |  |
| `currency` | `string` | No |  |
| `date` | `string` | No |  |
| `market` | `string` | No |  |
| `merchant` | `array` | No |  |
| `placement_id` | `string` | No |  |
| `revenue` | `float` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ReportDetail()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReportDetailEntity`

Create a new `ReportDetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReportGeneralEntity

```php
$report_general = $client->ReportGeneral();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `array` | No |  |
| `market` | `array` | No |  |
| `total` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ReportGeneral()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReportGeneralEntity`

Create a new `ReportGeneralEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReportModifiedEntity

```php
$report_modified = $client->ReportModified();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `market` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ReportModified()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReportModifiedEntity`

Create a new `ReportModifiedEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReportStatusEntity

```php
$report_status = $client->ReportStatus();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ReportStatus()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReportStatusEntity`

Create a new `ReportStatusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new YadorePublisherSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

