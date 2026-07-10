# YadorePublisher TypeScript SDK



The TypeScript SDK for the YadorePublisher API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.ConversionDetail()` — each with a small set of operations (`list`, `load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
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

`list()` resolves to an array of ConversionDetail objects — iterate it directly:

```ts
const conversiondetails = await client.ConversionDetail().list()

for (const conversiondetail of conversiondetails) {
  console.log(conversiondetail)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const conversiondetails = await client.ConversionDetail().list()
  console.log(conversiondetails)
} catch (err) {
  console.error('list failed:', err)
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

const conversiondetail = await client.ConversionDetail().list()
// conversiondetail is a bare entity populated with mock response data
console.log(conversiondetail)
```

You can also use the instance method:

```ts
const client = new YadorePublisherSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.ConversionDetail()

// First call runs the operation and stores its result
await entity.list()

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
| `click_id` |  |
| `date` |  |
| `market` |  |
| `merchant` |  |
| `placement_id` |  |
| `sale` |  |

Operations: list.

API path: `/v2/conversion/detail`

#### ConversionDetailMerchant

| Field | Description |
| --- | --- |
| `click` |  |
| `market` |  |
| `merchant` |  |
| `sale` |  |

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
| `is_couponing` |  |
| `market` |  |
| `placement_id` |  |
| `result` |  |
| `url` |  |

Operations: create.

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
| `offer_count` |  |
| `traffic_type` |  |

Operations: list.

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

Operations: list, load.

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
| `market` |  |

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
| `click_id` | `string` |  |
| `date` | `string` |  |
| `market` | `string` |  |
| `merchant` | `Record<string, any>` |  |
| `placement_id` | `string` |  |
| `sale` | `number` |  |

#### Example: List

```ts
const conversion_details = await client.ConversionDetail().list()
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
| `click` | `number` |  |
| `market` | `string` |  |
| `merchant` | `Record<string, any>` |  |
| `sale` | `number` |  |

#### Example: List

```ts
const conversion_detail_merchants = await client.ConversionDetailMerchant().list()
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
const conversion_general = await client.ConversionGeneral().load()
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
const conversion_status = await client.ConversionStatus().load()
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
| `is_couponing` | `boolean` |  |
| `market` | `string` |  |
| `placement_id` | `string` |  |
| `result` | `Record<string, any>` |  |
| `url` | `any[]` |  |

#### Example: Create

```ts
const deeplink = await client.Deeplink().create({
  market: 'example_market',
  url: [],
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
| `deeplink_count` | `number` |  |
| `estimated_cpc` | `Record<string, any>` |  |
| `has_external_homepage` | `boolean` |  |
| `has_smartlink_homepage` | `boolean` |  |
| `id` | `string` |  |
| `is_smartlink` | `boolean` |  |
| `logo` | `Record<string, any>` |  |
| `name` | `string` |  |
| `traffic_type` | `any[]` |  |

#### Example: List

```ts
const deeplink_merchants = await client.DeeplinkMerchant().list()
```


### Dnt

Create an instance: `const dnt = client.Dnt()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const dnt = await client.Dnt().load()
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
| `offer_count` | `number` |  |
| `traffic_type` | `any[]` |  |

#### Example: List

```ts
const merchants = await client.Merchant().list()
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
| `click_url` | `string` |  |
| `description` | `string` |  |
| `ean` | `Record<string, any>` |  |
| `eer` | `string` |  |
| `estimated_cpc` | `Record<string, any>` |  |
| `id` | `string` |  |
| `image` | `Record<string, any>` |  |
| `merchant` | `Record<string, any>` |  |
| `original_price` | `Record<string, any>` |  |
| `price` | `Record<string, any>` |  |
| `promo_text` | `string` |  |
| `shipping_price` | `Record<string, any>` |  |
| `shipping_time` | `Record<string, any>` |  |
| `thumbnail` | `Record<string, any>` |  |
| `title` | `string` |  |
| `unit_price` | `Record<string, any>` |  |

#### Example: Load

```ts
const offer = await client.Offer().load({ id: 'offer_id' })
```

#### Example: List

```ts
const offers = await client.Offer().list()
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
| `click_id` | `string` |  |
| `currency` | `string` |  |
| `date` | `string` |  |
| `market` | `string` |  |
| `merchant` | `Record<string, any>` |  |
| `placement_id` | `string` |  |
| `revenue` | `number` |  |

#### Example: List

```ts
const report_details = await client.ReportDetail().list()
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
const report_general = await client.ReportGeneral().load()
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
| `market` | `Record<string, any>` |  |

#### Example: Load

```ts
const report_modified = await client.ReportModified().load()
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
const report_status = await client.ReportStatus().load()
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const conversiondetail = client.ConversionDetail()
await conversiondetail.list()

// conversiondetail.data() now returns the conversiondetail data from the last `list`
// conversiondetail.match() returns the last match criteria
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
