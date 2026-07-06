# YadorePublisher PHP SDK



The PHP SDK for the YadorePublisher API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->ConversionDetail()` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/yadore-publisher-sdk/releases](https://github.com/voxgig-sdk/yadore-publisher-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'yadorepublisher_sdk.php';

$client = new YadorePublisherSDK([
    "apikey" => getenv("YADORE_PUBLISHER_APIKEY"),
]);
```

### 2. List conversiondetail records

```php
try {
    // list() returns an array of ConversionDetail records — iterate directly.
    $conversiondetails = $client->ConversionDetail()->list();
    foreach ($conversiondetails as $item) {
        echo $item["click_id"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $conversiondetails = $client->ConversionDetail()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = YadorePublisherSDK::test();

// Entity ops return the bare mock record (throws on error).
$conversiondetail = $client->ConversionDetail()->list();
print_r($conversiondetail);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new YadorePublisherSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
YADORE_PUBLISHER_TEST_LIVE=TRUE
YADORE_PUBLISHER_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### YadorePublisherSDK

```php
require_once 'yadorepublisher_sdk.php';
$client = new YadorePublisherSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = YadorePublisherSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### YadorePublisherSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `ConversionDetail` | `($data): ConversionDetailEntity` | Create a ConversionDetail entity instance. |
| `ConversionDetailMerchant` | `($data): ConversionDetailMerchantEntity` | Create a ConversionDetailMerchant entity instance. |
| `ConversionGeneral` | `($data): ConversionGeneralEntity` | Create a ConversionGeneral entity instance. |
| `ConversionStatus` | `($data): ConversionStatusEntity` | Create a ConversionStatus entity instance. |
| `Deeplink` | `($data): DeeplinkEntity` | Create a Deeplink entity instance. |
| `DeeplinkMerchant` | `($data): DeeplinkMerchantEntity` | Create a DeeplinkMerchant entity instance. |
| `Dnt` | `($data): DntEntity` | Create a Dnt entity instance. |
| `Market` | `($data): MarketEntity` | Create a Market entity instance. |
| `Merchant` | `($data): MerchantEntity` | Create a Merchant entity instance. |
| `Offer` | `($data): OfferEntity` | Create an Offer entity instance. |
| `ReportDetail` | `($data): ReportDetailEntity` | Create a ReportDetail entity instance. |
| `ReportGeneral` | `($data): ReportGeneralEntity` | Create a ReportGeneral entity instance. |
| `ReportModified` | `($data): ReportModifiedEntity` | Create a ReportModified entity instance. |
| `ReportStatus` | `($data): ReportStatusEntity` | Create a ReportStatus entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### ConversionDetail

| Field | Description |
| --- | --- |
| `click_id` |  |
| `date` |  |
| `market` |  |
| `merchant` |  |
| `placement_id` |  |
| `sale` |  |

Operations: List.

API path: `/v2/conversion/detail`

#### ConversionDetailMerchant

| Field | Description |
| --- | --- |
| `click` |  |
| `market` |  |
| `merchant` |  |
| `sale` |  |

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
| `is_couponing` |  |
| `market` |  |
| `placement_id` |  |
| `result` |  |
| `url` |  |

Operations: Create.

API path: `/v2/deeplink`

#### DeeplinkMerchant

| Field | Description |
| --- | --- |
| `deeplink_count` |  |
| `estimated_cpc` |  |
| `has_external_homepage` |  |
| `has_smartlink_homepage` |  |
| `id` |  |
| `is_smartlink` |  |
| `logo` |  |
| `name` |  |
| `traffic_type` |  |

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
| `offer_count` |  |
| `traffic_type` |  |

Operations: List.

API path: `/v2/merchant`

#### Offer

| Field | Description |
| --- | --- |
| `availability` |  |
| `brand` |  |
| `click_url` |  |
| `description` |  |
| `ean` |  |
| `eer` |  |
| `estimated_cpc` |  |
| `id` |  |
| `image` |  |
| `merchant` |  |
| `original_price` |  |
| `price` |  |
| `promo_text` |  |
| `shipping_price` |  |
| `shipping_time` |  |
| `thumbnail` |  |
| `title` |  |
| `unit_price` |  |

Operations: List, Load.

API path: `/v2/offer`

#### ReportDetail

| Field | Description |
| --- | --- |
| `click_id` |  |
| `currency` |  |
| `date` |  |
| `market` |  |
| `merchant` |  |
| `placement_id` |  |
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
| `market` |  |

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

Create an instance: `$conversion_detail = $client->ConversionDetail();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `click_id` | `string` |  |
| `date` | `string` |  |
| `market` | `string` |  |
| `merchant` | `array` |  |
| `placement_id` | `string` |  |
| `sale` | `float` |  |

#### Example: List

```php
// list() returns an array of ConversionDetail records (throws on error).
$conversion_details = $client->ConversionDetail()->list();
```


### ConversionDetailMerchant

Create an instance: `$conversion_detail_merchant = $client->ConversionDetailMerchant();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `click` | `int` |  |
| `market` | `string` |  |
| `merchant` | `array` |  |
| `sale` | `int` |  |

#### Example: List

```php
// list() returns an array of ConversionDetailMerchant records (throws on error).
$conversion_detail_merchants = $client->ConversionDetailMerchant()->list();
```


### ConversionGeneral

Create an instance: `$conversion_general = $client->ConversionGeneral();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `array` |  |
| `market` | `array` |  |
| `total` | `array` |  |

#### Example: Load

```php
// load() returns the bare ConversionGeneral record (throws on error).
$conversion_general = $client->ConversionGeneral()->load();
```


### ConversionStatus

Create an instance: `$conversion_status = $client->ConversionStatus();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `string` |  |

#### Example: Load

```php
// load() returns the bare ConversionStatus record (throws on error).
$conversion_status = $client->ConversionStatus()->load();
```


### Deeplink

Create an instance: `$deeplink = $client->Deeplink();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `is_couponing` | `bool` |  |
| `market` | `string` |  |
| `placement_id` | `string` |  |
| `result` | `array` |  |
| `url` | `array` |  |

#### Example: Create

```php
$deeplink = $client->Deeplink()->create([
    "market" => null, // string
    "url" => null, // array
]);
```


### DeeplinkMerchant

Create an instance: `$deeplink_merchant = $client->DeeplinkMerchant();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deeplink_count` | `int` |  |
| `estimated_cpc` | `array` |  |
| `has_external_homepage` | `bool` |  |
| `has_smartlink_homepage` | `bool` |  |
| `id` | `string` |  |
| `is_smartlink` | `bool` |  |
| `logo` | `array` |  |
| `name` | `string` |  |
| `traffic_type` | `array` |  |

#### Example: List

```php
// list() returns an array of DeeplinkMerchant records (throws on error).
$deeplink_merchants = $client->DeeplinkMerchant()->list();
```


### Dnt

Create an instance: `$dnt = $client->Dnt();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare Dnt record (throws on error).
$dnt = $client->Dnt()->load();
```


### Market

Create an instance: `$market = $client->Market();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```php
// list() returns an array of Market records (throws on error).
$markets = $client->Market()->list();
```


### Merchant

Create an instance: `$merchant = $client->Merchant();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `logo` | `array` |  |
| `name` | `string` |  |
| `offer_count` | `int` |  |
| `traffic_type` | `array` |  |

#### Example: List

```php
// list() returns an array of Merchant records (throws on error).
$merchants = $client->Merchant()->list();
```


### Offer

Create an instance: `$offer = $client->Offer();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability` | `string` |  |
| `brand` | `string` |  |
| `click_url` | `string` |  |
| `description` | `string` |  |
| `ean` | `array` |  |
| `eer` | `string` |  |
| `estimated_cpc` | `array` |  |
| `id` | `string` |  |
| `image` | `array` |  |
| `merchant` | `array` |  |
| `original_price` | `array` |  |
| `price` | `array` |  |
| `promo_text` | `string` |  |
| `shipping_price` | `array` |  |
| `shipping_time` | `array` |  |
| `thumbnail` | `array` |  |
| `title` | `string` |  |
| `unit_price` | `array` |  |

#### Example: Load

```php
// load() returns the bare Offer record (throws on error).
$offer = $client->Offer()->load(["id" => "offer_id"]);
```

#### Example: List

```php
// list() returns an array of Offer records (throws on error).
$offers = $client->Offer()->list();
```


### ReportDetail

Create an instance: `$report_detail = $client->ReportDetail();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `click_id` | `string` |  |
| `currency` | `string` |  |
| `date` | `string` |  |
| `market` | `string` |  |
| `merchant` | `array` |  |
| `placement_id` | `string` |  |
| `revenue` | `float` |  |

#### Example: List

```php
// list() returns an array of ReportDetail records (throws on error).
$report_details = $client->ReportDetail()->list();
```


### ReportGeneral

Create an instance: `$report_general = $client->ReportGeneral();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `array` |  |
| `market` | `array` |  |
| `total` | `array` |  |

#### Example: Load

```php
// load() returns the bare ReportGeneral record (throws on error).
$report_general = $client->ReportGeneral()->load();
```


### ReportModified

Create an instance: `$report_modified = $client->ReportModified();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `market` | `array` |  |

#### Example: Load

```php
// load() returns the bare ReportModified record (throws on error).
$report_modified = $client->ReportModified()->load();
```


### ReportStatus

Create an instance: `$report_status = $client->ReportStatus();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `string` |  |

#### Example: Load

```php
// load() returns the bare ReportStatus record (throws on error).
$report_status = $client->ReportStatus()->load();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── yadorepublisher_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`yadorepublisher_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$conversiondetail = $client->ConversionDetail();
$conversiondetail->list();

// $conversiondetail->data_get() now returns the conversiondetail data from the last list
// $conversiondetail->match_get() returns the last match criteria
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
