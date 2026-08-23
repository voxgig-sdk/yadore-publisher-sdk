# YadorePublisher TypeScript SDK Reference

Complete API reference for the YadorePublisher TypeScript SDK.


## YadorePublisherSDK

### Constructor

```ts
new YadorePublisherSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `YadorePublisherSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = YadorePublisherSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `YadorePublisherSDK` instance in test mode.


### Instance Methods

#### `ConversionDetail(data?: object)`

Create a new `ConversionDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConversionDetailEntity` instance.

#### `ConversionDetailMerchant(data?: object)`

Create a new `ConversionDetailMerchant` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConversionDetailMerchantEntity` instance.

#### `ConversionGeneral(data?: object)`

Create a new `ConversionGeneral` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConversionGeneralEntity` instance.

#### `ConversionStatus(data?: object)`

Create a new `ConversionStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConversionStatusEntity` instance.

#### `Deeplink(data?: object)`

Create a new `Deeplink` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeeplinkEntity` instance.

#### `DeeplinkMerchant(data?: object)`

Create a new `DeeplinkMerchant` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeeplinkMerchantEntity` instance.

#### `Dnt(data?: object)`

Create a new `Dnt` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DntEntity` instance.

#### `Market(data?: object)`

Create a new `Market` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MarketEntity` instance.

#### `Merchant(data?: object)`

Create a new `Merchant` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MerchantEntity` instance.

#### `Offer(data?: object)`

Create a new `Offer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OfferEntity` instance.

#### `ReportDetail(data?: object)`

Create a new `ReportDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReportDetailEntity` instance.

#### `ReportGeneral(data?: object)`

Create a new `ReportGeneral` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReportGeneralEntity` instance.

#### `ReportModified(data?: object)`

Create a new `ReportModified` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReportModifiedEntity` instance.

#### `ReportStatus(data?: object)`

Create a new `ReportStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReportStatusEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `YadorePublisherSDK.test()`.

**Returns:** `YadorePublisherSDK` instance in test mode.


---

## ConversionDetailEntity

```ts
const conversion_detail = client.ConversionDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clickId` | `string` | No |  |
| `date` | `string` | No |  |
| `market` | `string` | No |  |
| `merchant` | `Record<string, any>` | No |  |
| `placementId` | `string` | No |  |
| `sales` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ConversionDetail().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConversionDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `YadorePublisherSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConversionDetailMerchantEntity

```ts
const conversion_detail_merchant = client.ConversionDetailMerchant()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clicks` | `number` | No |  |
| `market` | `string` | No | Two character form of a country, in all lower-case |
| `merchant` | `Record<string, any>` | No |  |
| `sales` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ConversionDetailMerchant().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConversionDetailMerchantEntity` instance with the same client and
options.

#### `client()`

Return the parent `YadorePublisherSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConversionGeneralEntity

```ts
const conversion_general = client.ConversionGeneral()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `Record<string, any>` | No |  |
| `market` | `Record<string, any>` | No |  |
| `total` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ConversionGeneral().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConversionGeneralEntity` instance with the same client and
options.

#### `client()`

Return the parent `YadorePublisherSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConversionStatusEntity

```ts
const conversion_status = client.ConversionStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ConversionStatus().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConversionStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `YadorePublisherSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeeplinkEntity

```ts
const deeplink = client.Deeplink()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deeplinks` | `any[]` | No |  |
| `found` | `number` | No |  |
| `isCouponing` | `boolean` | No | If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not. |
| `market` | `string` | Yes | The market to query. |
| `placementId` | `string` | No | Your own subID for your click-tracking. |
| `total` | `number` | No |  |
| `urls` | `any[]` | Yes | An array of URLs |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Deeplink().create({
  market: 'example_market',
  urls: [],
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeeplinkEntity` instance with the same client and
options.

#### `client()`

Return the parent `YadorePublisherSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeeplinkMerchantEntity

```ts
const deeplink_merchant = client.DeeplinkMerchant()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deeplinkCount` | `number` | No | Even when a merchant has no deeplinks, it might still have smartlinks. |
| `estimatedCpc` | `Record<string, any>` | No |  |
| `hasExternalHomepage` | `boolean` | No | If the merchant accept homepage deeplinks. |
| `hasSmartlinkHomepage` | `boolean` | No | If the merchant accept homepage smartlinks. |
| `id` | `string` | No |  |
| `isSmartlink` | `boolean` | No | If the merchant has one or more smartlinks. |
| `logo` | `Record<string, any>` | No |  |
| `name` | `string` | No |  |
| `trafficTypes` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DeeplinkMerchant().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeeplinkMerchantEntity` instance with the same client and
options.

#### `client()`

Return the parent `YadorePublisherSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DntEntity

```ts
const dnt = client.Dnt()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Dnt().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DntEntity` instance with the same client and
options.

#### `client()`

Return the parent `YadorePublisherSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MarketEntity

```ts
const market = client.Market()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Market().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MarketEntity` instance with the same client and
options.

#### `client()`

Return the parent `YadorePublisherSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MerchantEntity

```ts
const merchant = client.Merchant()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `logo` | `Record<string, any>` | No |  |
| `name` | `string` | No |  |
| `offerCount` | `number` | No |  |
| `trafficTypes` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Merchant().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MerchantEntity` instance with the same client and
options.

#### `client()`

Return the parent `YadorePublisherSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OfferEntity

```ts
const offer = client.Offer()
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
| `estimatedCpc` | `Record<string, any>` | No | estimatedCPC means the gross revenue per click Yadore gets from its merchants, you have to use your revenue share to get your estimatedCPC. |
| `id` | `string` | No |  |
| `image` | `Record<string, any>` | No |  |
| `merchant` | `Record<string, any>` | No |  |
| `offers` | `any[]` | No |  |
| `originalPrice` | `Record<string, any>` | No |  |
| `price` | `Record<string, any>` | No |  |
| `promoText` | `string` | No |  |
| `shippingPrice` | `Record<string, any>` | No |  |
| `shippingTime` | `Record<string, any>` | No |  |
| `thumbnail` | `Record<string, any>` | No |  |
| `title` | `string` | No |  |
| `unitPrice` | `Record<string, any>` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `bulk` | `/v2/offer/bulk` | `client.Offer().load({ $action: 'bulk', ... })` |

An action returns that action's OWN response, which is not necessarily a
Offer record — check the API definition for its shape.

```ts
const result = await client.Offer().load({
  $action: 'bulk',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Offer().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Offer().load({ id: 'offer_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OfferEntity` instance with the same client and
options.

#### `client()`

Return the parent `YadorePublisherSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReportDetailEntity

```ts
const report_detail = client.ReportDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clickId` | `string` | No |  |
| `currency` | `string` | No |  |
| `date` | `string` | No |  |
| `market` | `string` | No |  |
| `merchant` | `Record<string, any>` | No |  |
| `placementId` | `string` | No |  |
| `revenue` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ReportDetail().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReportDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `YadorePublisherSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReportGeneralEntity

```ts
const report_general = client.ReportGeneral()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `Record<string, any>` | No |  |
| `market` | `Record<string, any>` | No |  |
| `total` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ReportGeneral().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReportGeneralEntity` instance with the same client and
options.

#### `client()`

Return the parent `YadorePublisherSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReportModifiedEntity

```ts
const report_modified = client.ReportModified()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No |  |
| `modifiedDate` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ReportModified().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReportModifiedEntity` instance with the same client and
options.

#### `client()`

Return the parent `YadorePublisherSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReportStatusEntity

```ts
const report_status = client.ReportStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ReportStatus().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReportStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `YadorePublisherSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new YadorePublisherSDK({
  feature: {
    test: { active: true },
  }
})
```

