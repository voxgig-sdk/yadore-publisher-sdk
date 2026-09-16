# Yadore Publisher API

This is an overview of all the available API endpoints. Each API is grouped and you can unfold the different endpoints to get detailed information on how to use them. You can use this actionable documentation or an application of your choice (for example [Postman](https://www.postman.com/)) to browse the API. ## Endpoints The API servers are available under the URL: `https://api.yadore.com/`. You must use this URL for all API requests. For example to search for offers, you must send your request to `https://api.yadore.com/v2/offer`. This doesn&#39;t concern you when you are using this documentation. You can use the endpoints here by clicking on `Try it out`. ## Authentication You must add your API-Key as header `API-Key` to all requests in the application of your choice. For authorizing your requests in this actionable documentation, you must use the `Authorize` button below and enter your API-Key. ## FAQ 1. What Yadore understands as **offer** – for us an offer is a product offer from a specific merchant, example would be a specific washing machine from for example _Mediamarkt.de_. 2. What Yadore understands as **deeplink** – for us a deeplink is a specific product landing page from a merchant, so the deep link request must look like `shopdomain.de/category/specific_product.html`. 3. What Yadore understands as **smartlink** – for us a smartlink merchant is a merchant, where the publisher can send the user anywhere, means home page, category page, product page, etc. However, you must specify exactly where you want to send the user (that is homepage, category, ..) as the API will not automatically generate this for you. 4. All monetary values are always in **Euro**. 5. All dates returned from any endpoint are in **UTC time**. 6. All API parameters are **case sensitive**. 7. The estimated CPC in all APIs is 100% Yadore, to calculate your revenue you have to adapt your share. 8. We classify publishers in _“no couponing”_, _“couponing”_ and _“mixed”_. This is important as _“mixed”_ publishers need to use a parameter to inform if a click is couponing or not. If you feel wrongly classified just speak to your account manager. 9. If there are any further questions, please contact your account manager or send an email to [mail@yadore.com](mailto:mail@yadore.com).

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 14 entities and 15 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### ConversionDetail

Results: Report Detail Response.

SDK operations: `list`.

### ConversionDetailMerchant

Results: Conversion Detail Merchant Response.

SDK operations: `list`.

Key fields to recognise:

- `market`: Two character form of a country, in all lower-case

### ConversionGeneral

Results: Report General Response.

SDK operations: `load`.

### ConversionStatus

Results: Conversion Report Status Response.

SDK operations: `load`.

### Deeplink

Results: Deeplink Response.

SDK operations: `create`.

Key fields to recognise:

- `isCouponing`: If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not.
- `market`: The market to query.
- `placementId`: Your own subID for your click-tracking.
- `urls`: An array of URLs

### DeeplinkMerchant

Results: Deeplink Merchant Response.

SDK operations: `list`.

Key fields to recognise:

- `deeplinkCount`: Even when a merchant has no deeplinks, it might still have smartlinks.
- `hasExternalHomepage`: If the merchant accept homepage deeplinks.
- `hasSmartlinkHomepage`: If the merchant accept homepage smartlinks.
- `isSmartlink`: If the merchant has one or more smartlinks.

### Dnt

SDK operations: `load`.

### Market

Results: Market List Response.

SDK operations: `list`.

### Merchant

Results: Merchant Response.

SDK operations: `list`.

### Offer

Results: Offer Response; Offer Ean Bulk Response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `estimatedCpc`: estimatedCPC means the gross revenue per click Yadore gets from its merchants, you have to use your revenue share to get your estimatedCPC. Be aware, the CPC paid can still differ from the estimated CPC

### ReportDetail

Results: Report Detail Response.

SDK operations: `list`.

### ReportGeneral

Results: Report General Response.

SDK operations: `load`.

### ReportModified

Results: Report Modified Response.

SDK operations: `load`.

### ReportStatus

Results: Report Status Response.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| ConversionDetail | `list` | `GET /v2/conversion/detail` | Required |
| ConversionDetailMerchant | `list` | `GET /v2/conversion/detail/merchant` | Required |
| ConversionGeneral | `load` | `GET /v2/conversion/general` | Required |
| ConversionStatus | `load` | `GET /v2/conversion/status` | Required |
| Deeplink | `create` | `POST /v2/deeplink` | Required |
| DeeplinkMerchant | `list` | `GET /v2/deeplink/merchant` | Required |
| Dnt | `load` | `GET /v2/d` | Required |
| Market | `list` | `GET /v2/markets` | Required |
| Merchant | `list` | `GET /v2/merchant` | Required |
| Offer | `list` | `GET /v2/offer` | Required |
| Offer | `load` | `GET /v2/offer/bulk` | Required |
| ReportDetail | `list` | `GET /v2/report/detail` | Required |
| ReportGeneral | `load` | `GET /v2/report/general` | Required |
| ReportModified | `load` | `GET /v2/report/modified` | Required |
| ReportStatus | `load` | `GET /v2/report/status` | Required |

## Connect to the API

- API server: `https://api.yadore.com/`

The default credential is sent in the `API-Key` header.

Your project&#39;s API-Key.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `yadore-publisher_list`: List records for an entity. Supported entities: `conversion_detail`, `conversion_detail_merchant`, `deeplink_merchant`, `market`, `merchant`, `offer`, `report_detail`.
- `yadore-publisher_load`: Load one record for an entity. Supported entities: `conversion_general`, `conversion_status`, `dnt`, `offer`, `report_general`, `report_modified`, `report_status`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

