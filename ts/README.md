# YadorePublisher TypeScript SDK



The TypeScript SDK for the YadorePublisher API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.ConversionDetail()` — each with a small set of operations (`list`, `load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/yadore-publisher-sdk/releases](https://github.com/voxgig-sdk/yadore-publisher-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { YadorePublisherSDK } from '@voxgig-sdk/yadore-publisher'

const client = new YadorePublisherSDK({
  apikey: process.env.YADORE_PUBLISHER_APIKEY,
})
```

### 2. List conversiondetail records

`list()` resolves to an array of ConversionDetail ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const conversiondetails = await client.ConversionDetail().list({ date: "example", format: "example" })

for (const conversiondetail of conversiondetails) {
  console.log(conversiondetail)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const reportgeneral = await client.ReportGeneral().load({ date: "example", format: "example" })
  console.log(reportgeneral)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = YadorePublisherSDK.test()

const reportgeneral = await client.ReportGeneral().load({ date: 'example_date', format: 'example_format' })
// reportgeneral is the entity, populated with mock response data
// — call reportgeneral.data() for the record itself
console.log(reportgeneral)
```

You can also use the instance method:

```ts
const client = new YadorePublisherSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.ReportGeneral()

// First call runs the operation and stores its result
await entity.load({ date: 'example_date', format: 'example_format' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new YadorePublisherSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### YadorePublisherSDK

#### Constructor

```ts
new YadorePublisherSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `ConversionDetail(data?)` | `ConversionDetailEntity` | Create a ConversionDetail entity instance. |
| `ConversionDetailMerchant(data?)` | `ConversionDetailMerchantEntity` | Create a ConversionDetailMerchant entity instance. |
| `ConversionGeneral(data?)` | `ConversionGeneralEntity` | Create a ConversionGeneral entity instance. |
| `ConversionStatus(data?)` | `ConversionStatusEntity` | Create a ConversionStatus entity instance. |
| `Deeplink(data?)` | `DeeplinkEntity` | Create a Deeplink entity instance. |
| `DeeplinkMerchant(data?)` | `DeeplinkMerchantEntity` | Create a DeeplinkMerchant entity instance. |
| `Dnt(data?)` | `DntEntity` | Create a Dnt entity instance. |
| `Market(data?)` | `MarketEntity` | Create a Market entity instance. |
| `Merchant(data?)` | `MerchantEntity` | Create a Merchant entity instance. |
| `Offer(data?)` | `OfferEntity` | Create an Offer entity instance. |
| `ReportDetail(data?)` | `ReportDetailEntity` | Create a ReportDetail entity instance. |
| `ReportGeneral(data?)` | `ReportGeneralEntity` | Create a ReportGeneral entity instance. |
| `ReportModified(data?)` | `ReportModifiedEntity` | Create a ReportModified entity instance. |
| `ReportStatus(data?)` | `ReportStatusEntity` | Create a ReportStatus entity instance. |
| `tester(testopts?, sdkopts?)` | `YadorePublisherSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `YadorePublisherSDK.test(testopts?, sdkopts?)` | `YadorePublisherSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): YadorePublisherSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list.

API path: `/v2/conversion/detail`

#### ConversionDetailMerchant

| Field | Description |
| --- | --- |
| `clicks` |  |
| `market` | Two character form of a country, in all lower-case |
| `merchant` |  |
| `sales` |  |

Operations: list.

API path: `/v2/conversion/detail/merchant`

#### ConversionGeneral

| Field | Description |
| --- | --- |
| `date` |  |
| `market` |  |
| `total` |  |

Operations: load.

API path: `/v2/conversion/general`

#### ConversionStatus

| Field | Description |
| --- | --- |
| `status` |  |

Operations: load.

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

Operations: create.

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

Operations: list.

API path: `/v2/deeplink/merchant`

#### Dnt

| Field | Description |
| --- | --- |

Operations: load.

API path: `/v2/d`

#### Market

| Field | Description |
| --- | --- |
| `id` |  |

Operations: list.

API path: `/v2/markets`

#### Merchant

| Field | Description |
| --- | --- |
| `id` |  |
| `logo` |  |
| `name` |  |
| `offerCount` |  |
| `trafficTypes` |  |

Operations: list.

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

Operations: list, load.

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

Operations: list.

API path: `/v2/report/detail`

#### ReportGeneral

| Field | Description |
| --- | --- |
| `date` |  |
| `market` |  |
| `total` |  |

Operations: load.

API path: `/v2/report/general`

#### ReportModified

| Field | Description |
| --- | --- |
| `date` |  |
| `modifiedDate` |  |

Operations: load.

API path: `/v2/report/modified`

#### ReportStatus

| Field | Description |
| --- | --- |
| `status` |  |

Operations: load.

API path: `/v2/report/status`



## Entities


### ConversionDetail

Create an instance: `const conversion_detail = client.ConversionDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clickId` | `string` |  |
| `date` | `string` |  |
| `market` | `string` |  |
| `merchant` | `Record<string, any>` |  |
| `placementId` | `string` |  |
| `sales` | `number` |  |

#### Example: List

```ts
const conversion_details = await client.ConversionDetail().list({ date: "example", format: "example" })
```


### ConversionDetailMerchant

Create an instance: `const conversion_detail_merchant = client.ConversionDetailMerchant()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clicks` | `number` |  |
| `market` | `string` | Two character form of a country, in all lower-case |
| `merchant` | `Record<string, any>` |  |
| `sales` | `number` |  |

#### Example: List

```ts
const conversion_detail_merchants = await client.ConversionDetailMerchant().list({ format: "example", from: "example", to: "example" })
```


### ConversionGeneral

Create an instance: `const conversion_general = client.ConversionGeneral()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `Record<string, any>` |  |
| `market` | `Record<string, any>` |  |
| `total` | `Record<string, any>` |  |

#### Example: Load

```ts
const conversion_general = await client.ConversionGeneral().load({ format: 'format', from: 'from', to: 'to' })
```


### ConversionStatus

Create an instance: `const conversion_status = client.ConversionStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `string` |  |

#### Example: Load

```ts
const conversion_status = await client.ConversionStatus().load({ date: 'date' })
```


### Deeplink

Create an instance: `const deeplink = client.Deeplink()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deeplinks` | `any[]` |  |
| `found` | `number` |  |
| `isCouponing` | `boolean` | If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not. |
| `market` | `string` | The market to query. |
| `placementId` | `string` | Your own subID for your click-tracking. |
| `total` | `number` |  |
| `urls` | `any[]` | An array of URLs |

#### Example: Create

```ts
const deeplink = await client.Deeplink().create({
  market: 'example_market',
  urls: [],
})
```


### DeeplinkMerchant

Create an instance: `const deeplink_merchant = client.DeeplinkMerchant()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deeplinkCount` | `number` | Even when a merchant has no deeplinks, it might still have smartlinks. |
| `estimatedCpc` | `Record<string, any>` |  |
| `hasExternalHomepage` | `boolean` | If the merchant accept homepage deeplinks. |
| `hasSmartlinkHomepage` | `boolean` | If the merchant accept homepage smartlinks. |
| `id` | `string` |  |
| `isSmartlink` | `boolean` | If the merchant has one or more smartlinks. |
| `logo` | `Record<string, any>` |  |
| `name` | `string` |  |
| `trafficTypes` | `any[]` |  |

#### Example: List

```ts
const deeplink_merchants = await client.DeeplinkMerchant().list({ market: "example" })
```


### Dnt

Create an instance: `const dnt = client.Dnt()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const dnt = await client.Dnt().load({ market: 'market', project_id: 'project_id', url: 'url' })
```


### Market

Create an instance: `const market = client.Market()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```ts
const markets = await client.Market().list()
```


### Merchant

Create an instance: `const merchant = client.Merchant()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `logo` | `Record<string, any>` |  |
| `name` | `string` |  |
| `offerCount` | `number` |  |
| `trafficTypes` | `any[]` |  |

#### Example: List

```ts
const merchants = await client.Merchant().list({ market: "example" })
```


### Offer

Create an instance: `const offer = client.Offer()`

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
| `clickUrl` | `string` |  |
| `count` | `number` |  |
| `description` | `string` |  |
| `eer` | `string` |  |
| `estimatedCpc` | `Record<string, any>` | estimatedCPC means the gross revenue per click Yadore gets from its merchants, you have to use your revenue share to get your estimatedCPC. |
| `id` | `string` |  |
| `image` | `Record<string, any>` |  |
| `merchant` | `Record<string, any>` |  |
| `offers` | `any[]` |  |
| `originalPrice` | `Record<string, any>` |  |
| `price` | `Record<string, any>` |  |
| `promoText` | `string` |  |
| `shippingPrice` | `Record<string, any>` |  |
| `shippingTime` | `Record<string, any>` |  |
| `thumbnail` | `Record<string, any>` |  |
| `title` | `string` |  |
| `unitPrice` | `Record<string, any>` |  |

#### Example: Load

```ts
const offer = await client.Offer().load({ ean: 'ean', market: 'market' })
```

#### Example: List

```ts
const offers = await client.Offer().list({ market: "example" })
```


### ReportDetail

Create an instance: `const report_detail = client.ReportDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clickId` | `string` |  |
| `currency` | `string` |  |
| `date` | `string` |  |
| `market` | `string` |  |
| `merchant` | `Record<string, any>` |  |
| `placementId` | `string` |  |
| `revenue` | `number` |  |

#### Example: List

```ts
const report_details = await client.ReportDetail().list({ date: "example", format: "example" })
```


### ReportGeneral

Create an instance: `const report_general = client.ReportGeneral()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `Record<string, any>` |  |
| `market` | `Record<string, any>` |  |
| `total` | `Record<string, any>` |  |

#### Example: Load

```ts
const report_general = await client.ReportGeneral().load({ date: 'date', format: 'format' })
```


### ReportModified

Create an instance: `const report_modified = client.ReportModified()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `string` |  |
| `modifiedDate` | `string` |  |

#### Example: Load

```ts
const report_modified = await client.ReportModified().load({ from: 'from', to: 'to' })
```


### ReportStatus

Create an instance: `const report_status = client.ReportStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `string` |  |

#### Example: Load

```ts
const report_status = await client.ReportStatus().load({ date: 'date' })
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
yadore-publisher/
├── src/
│   ├── YadorePublisherSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { YadorePublisherSDK } from '@voxgig-sdk/yadore-publisher'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const reportgeneral = client.ReportGeneral()
await reportgeneral.load({ date: "example", format: "example" })

// reportgeneral.data() now returns the reportgeneral data from the last `load`
// reportgeneral.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
