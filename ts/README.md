# YadorePublisher TypeScript SDK



The TypeScript SDK for the YadorePublisher API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
npm install yadore-publisher
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { YadorePublisherSDK } from 'yadore-publisher'

const client = new YadorePublisherSDK({
  apikey: process.env.YADORE-PUBLISHER_APIKEY,
})
```

### 2. List conversiondetails

```ts
const result = await client.ConversionDetail().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
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

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new YadorePublisherSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
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
YADORE-PUBLISHER_TEST_LIVE=TRUE
YADORE-PUBLISHER_APIKEY=<your-key>
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
| `Offer(data?)` | `OfferEntity` | Create a Offer entity instance. |
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
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): YadorePublisherSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

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
| `click_id` | ``$STRING`` |  |
| `date` | ``$STRING`` |  |
| `market` | ``$STRING`` |  |
| `merchant` | ``$OBJECT`` |  |
| `placement_id` | ``$STRING`` |  |
| `sale` | ``$NUMBER`` |  |

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
| `click` | ``$INTEGER`` |  |
| `market` | ``$STRING`` |  |
| `merchant` | ``$OBJECT`` |  |
| `sale` | ``$INTEGER`` |  |

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
| `date` | ``$OBJECT`` |  |
| `market` | ``$OBJECT`` |  |
| `total` | ``$OBJECT`` |  |

#### Example: Load

```ts
const conversion_general = await client.ConversionGeneral().load({ id: 'conversion_general_id' })
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
| `status` | ``$STRING`` |  |

#### Example: Load

```ts
const conversion_status = await client.ConversionStatus().load({ id: 'conversion_status_id' })
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
| `is_couponing` | ``$BOOLEAN`` |  |
| `market` | ``$STRING`` |  |
| `placement_id` | ``$STRING`` |  |
| `result` | ``$OBJECT`` |  |
| `url` | ``$ARRAY`` |  |

#### Example: Create

```ts
const deeplink = await client.Deeplink().create({
  market: /* `$STRING` */,
  url: /* `$ARRAY` */,
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
const dnt = await client.Dnt().load({ id: 'dnt_id' })
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
| `id` | ``$STRING`` |  |

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
| `id` | ``$STRING`` |  |
| `logo` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `offer_count` | ``$INTEGER`` |  |
| `traffic_type` | ``$ARRAY`` |  |

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
| `click_id` | ``$STRING`` |  |
| `currency` | ``$STRING`` |  |
| `date` | ``$STRING`` |  |
| `market` | ``$STRING`` |  |
| `merchant` | ``$OBJECT`` |  |
| `placement_id` | ``$STRING`` |  |
| `revenue` | ``$NUMBER`` |  |

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
| `date` | ``$OBJECT`` |  |
| `market` | ``$OBJECT`` |  |
| `total` | ``$OBJECT`` |  |

#### Example: Load

```ts
const report_general = await client.ReportGeneral().load({ id: 'report_general_id' })
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
| `market` | ``$OBJECT`` |  |

#### Example: Load

```ts
const report_modified = await client.ReportModified().load({ id: 'report_modified_id' })
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
| `status` | ``$STRING`` |  |

#### Example: Load

```ts
const report_status = await client.ReportStatus().load({ id: 'report_status_id' })
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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

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
import { YadorePublisherSDK } from 'yadore-publisher'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
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
