

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { YadorePublisherSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('OfferEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YADORE_PUBLISHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('YADORE_PUBLISHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YadorePublisherSDK.test()
    const ent = testsdk.Offer()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YADORE_PUBLISHER_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'offer.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"availability","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"brand","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"clickUrl","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"count","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"description","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"eer","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"estimatedCpc","req":false,"short":"estimatedCPC means the gross revenue per click Yadore gets from its merchants, you have to use your revenue share to get your estimatedCPC.","type":"`$OBJECT`","index$":6},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":7},{"active":true,"name":"image","req":false,"type":"`$OBJECT`","index$":8},{"active":true,"name":"merchant","req":false,"type":"`$OBJECT`","index$":9},{"active":true,"name":"offers","req":false,"type":"`$ARRAY`","index$":10},{"active":true,"name":"originalPrice","req":false,"type":"`$OBJECT`","index$":11},{"active":true,"name":"price","req":false,"type":"`$OBJECT`","index$":12},{"active":true,"name":"promoText","req":false,"type":"`$STRING`","index$":13},{"active":true,"name":"shippingPrice","req":false,"type":"`$OBJECT`","index$":14},{"active":true,"name":"shippingTime","req":false,"type":"`$OBJECT`","index$":15},{"active":true,"name":"thumbnail","req":false,"type":"`$OBJECT`","index$":16},{"active":true,"name":"title","req":false,"type":"`$STRING`","index$":17},{"active":true,"name":"unitPrice","req":false,"type":"`$OBJECT`","index$":18}],"id":{"field":"id","name":"id"},"name":"offer","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"ean","orig":"ean","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"is_couponing","orig":"is_couponing","reqd":false,"type":"`$BOOLEAN`","index$":1},{"active":true,"kind":"query","name":"keyword","orig":"keyword","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"kind":"query","name":"market","orig":"market","reqd":true,"type":"`$STRING`","index$":4},{"active":true,"kind":"query","name":"merchant_id","orig":"merchant_id","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"kind":"query","name":"offer_id","orig":"offer_id","reqd":false,"type":"`$STRING`","index$":6},{"active":true,"kind":"query","name":"placement_id","orig":"placement_id","reqd":false,"type":"`$STRING`","index$":7},{"active":true,"example":"fuzzy","kind":"query","name":"precision","orig":"precision","reqd":false,"type":"`$STRING`","index$":8},{"active":true,"example":"rel_desc","kind":"query","name":"sort","orig":"sort","reqd":false,"type":"`$STRING`","index$":9}]},"contract":{"id":"GET /v2/offer","json":"{\"operationId\":\"getOffer\",\"parameters\":[{\"description\":\"Market to search. You can get the markets you are activated for with the Markets API.\",\"in\":\"query\",\"name\":\"market\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Keyword to search. Must be at least one character long.\",\"in\":\"query\",\"name\":\"keyword\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter the results by this EAN. Must be `8`, `13` or `14` characters long. When omitted, you will get offers regardless of an ean.\",\"in\":\"query\",\"name\":\"ean\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Merchant ID to filter the offers. You can use this parameter to narrow the results. If omitted, you will get offers for all merchants.\",\"in\":\"query\",\"name\":\"merchantId\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Offer ID to filter the offers. If set you will only get this one offer, if it is found and active.\",\"in\":\"query\",\"name\":\"offerId\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Your own subID for your click-tracking. Must be at most 128 characters long. Only printable ASCII-characters are allowed. Defaults to `null`.\",\"in\":\"query\",\"name\":\"placementId\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Precision for the fulltext search. `strict` uses a more strict approach to get more relevant results. `fuzzy` uses a less strict approach to get more results.\",\"in\":\"query\",\"name\":\"precision\",\"required\":false,\"schema\":{\"default\":\"fuzzy\",\"enum\":[\"strict\",\"fuzzy\"],\"type\":\"string\"}},{\"description\":\"Sort the results by relevance or price. Allowed values are `rel_desc`, `price_asc`, `price_desc`. Defaults to `rel_desc`. It is only possible to sort the results by relevance if you also specify a keyword. Without the keyword, the sort order is undefined.\",\"in\":\"query\",\"name\":\"sort\",\"required\":false,\"schema\":{\"default\":\"rel_desc\",\"enum\":[\"rel_desc\",\"price_asc\",\"price_desc\"],\"type\":\"string\"}},{\"description\":\"Limit of results, must be between `1` and `100`. Defaults to `20`.\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not. If you don’t use this parameter when your project is labeled _“mixed”_ your traffic will not get paid. If you want to find out the label, please ask your account manager. You only must use this parameter if you have mixed traffic. If you have either couponing or no couponing traffic, this parameter is not important for you.\\n\",\"in\":\"query\",\"name\":\"isCouponing\",\"required\":false,\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"offers\":{\"items\":{\"properties\":{\"availability\":{\"enum\":[\"AVAILABLE\",\"UNAVAILABLE\",\"UNKNOWN\",\"SOON\",\"PREORDER\",\"AVAILABLE ON ORDER\",\"STOCK ON ORDER\",\"BACKORDER\"],\"type\":\"string\"},\"brand\":{\"nullable\":true,\"type\":\"string\"},\"clickUrl\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"eer\":{\"nullable\":true,\"type\":\"string\"},\"estimatedCpc\":{\"description\":\"estimatedCPC means the gross revenue per click Yadore gets from its merchants,\\nyou have to use your revenue share to get your estimatedCPC.\\nBe aware, the CPC paid can still differ from the estimated CPC\\n\",\"properties\":{\"amount\":{\"type\":\"string\"},\"currency\":{\"type\":\"string\"}},\"type\":\"object\"},\"id\":{\"type\":\"string\"},\"image\":{\"properties\":{\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"merchant\":{\"properties\":{\"id\":{\"type\":\"string\"},\"logo\":{\"properties\":{\"exists\":{\"type\":\"boolean\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"originalPrice\":{\"properties\":{\"amount\":{\"type\":\"string\"},\"currency\":{\"type\":\"string\"}},\"type\":\"object\"},\"price\":{\"properties\":{\"amount\":{\"type\":\"string\"},\"currency\":{\"type\":\"string\"}},\"type\":\"object\"},\"promoText\":{\"nullable\":true,\"type\":\"string\"},\"shippingPrice\":{\"properties\":{\"amount\":{\"type\":\"string\"},\"currency\":{\"type\":\"string\"}},\"type\":\"object\"},\"shippingTime\":{\"properties\":{\"text\":{\"type\":\"string\"}},\"type\":\"object\"},\"thumbnail\":{\"properties\":{\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"title\":{\"type\":\"string\"},\"unitPrice\":{\"properties\":{\"text\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Offer Response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"errors\":{\"properties\":{\"isCouponing\":{\"items\":{\"oneOf\":[{\"example\":\"Field is required when mixed traffic is allowed\",\"type\":\"string\"},{\"example\":\"Field must be a boolean\",\"type\":\"string\"}]},\"type\":\"array\"},\"market\":{\"items\":{\"oneOf\":[{\"example\":\"Field is required\",\"type\":\"string\"},{\"example\":\"Market 'xy' not found\",\"type\":\"string\"}]},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad Request\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your project's API-Key.\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v2/offer","segments":[{"lit":"v2"},{"lit":"offer"}],"select":{"exist":["ean","is_couponing","keyword","limit","market","merchant_id","offer_id","placement_id","precision","sort"]},"transform":{"req":"`reqdata`","res":"`body.offers`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"12345678,87654321","kind":"query","name":"ean","orig":"ean","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"is_couponing","orig":"is_couponing","reqd":false,"type":"`$BOOLEAN`","index$":1},{"active":true,"kind":"query","name":"market","orig":"market","reqd":true,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"merchant_id","orig":"merchant_id","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"placement_id","orig":"placement_id","reqd":false,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /v2/offer/bulk","json":"{\"operationId\":\"getOffersByEan\",\"parameters\":[{\"description\":\"Market to search. You can get the markets you are activated for with the Markets API.\",\"in\":\"query\",\"name\":\"market\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The EANs to search (max. 50). Must be an comma seperated list of valid EANs. Each EAN must be `8`, `13` or `14` characters long.\",\"in\":\"query\",\"name\":\"eans\",\"required\":true,\"schema\":{\"example\":\"12345678,87654321\",\"type\":\"string\"}},{\"description\":\"Merchant ID to filter the offers. You can use this parameter to narrow the results. If omitted, you will get offers for all merchants.\",\"in\":\"query\",\"name\":\"merchantId\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Your own subID for your click-tracking. Must be at most 128 characters long. Only printable ASCII-characters are allowed. Defaults to `null`.\",\"in\":\"query\",\"name\":\"placementId\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not. If you don’t use this parameter when your project is labeled _“mixed”_ your traffic will not get paid. If you want to find out the label, please ask your account manager. You only must use this parameter if you have mixed traffic. If you have either couponing or no couponing traffic, this parameter is not important for you.\\n\",\"in\":\"query\",\"name\":\"isCouponing\",\"required\":false,\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"ean\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"offers\":{\"items\":{\"properties\":{\"availability\":{\"enum\":[\"AVAILABLE\",\"UNAVAILABLE\",\"UNKNOWN\",\"SOON\",\"PREORDER\",\"AVAILABLE ON ORDER\",\"STOCK ON ORDER\",\"BACKORDER\"],\"type\":\"string\"},\"brand\":{\"nullable\":true,\"type\":\"string\"},\"clickUrl\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"eer\":{\"nullable\":true,\"type\":\"string\"},\"estimatedCpc\":{\"description\":\"estimatedCPC means the gross revenue per click Yadore gets from its merchants,\\nyou have to use your revenue share to get your estimatedCPC.\\nBe aware, the CPC paid can still differ from the estimated CPC\\n\",\"properties\":{\"amount\":{\"type\":\"string\"},\"currency\":{\"type\":\"string\"}},\"type\":\"object\"},\"id\":{\"type\":\"string\"},\"image\":{\"properties\":{\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"merchant\":{\"properties\":{\"id\":{\"type\":\"string\"},\"logo\":{\"properties\":{\"exists\":{\"type\":\"boolean\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"originalPrice\":{\"properties\":{\"amount\":{\"type\":\"string\"},\"currency\":{\"type\":\"string\"}},\"type\":\"object\"},\"price\":{\"properties\":{\"amount\":{\"type\":\"string\"},\"currency\":{\"type\":\"string\"}},\"type\":\"object\"},\"promoText\":{\"nullable\":true,\"type\":\"string\"},\"shippingPrice\":{\"properties\":{\"amount\":{\"type\":\"string\"},\"currency\":{\"type\":\"string\"}},\"type\":\"object\"},\"shippingTime\":{\"properties\":{\"text\":{\"type\":\"string\"}},\"type\":\"object\"},\"thumbnail\":{\"properties\":{\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"title\":{\"type\":\"string\"},\"unitPrice\":{\"properties\":{\"text\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Offer Ean Bulk Response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"errors\":{\"properties\":{\"ean\":{\"items\":{\"oneOf\":[{\"example\":\"EAN list cant be empty\",\"type\":\"string\"},{\"example\":\"Cant request offers for more then 50 EANs at once\",\"type\":\"string\"}]},\"type\":\"array\"},\"isCouponing\":{\"items\":{\"oneOf\":[{\"example\":\"Field is required when mixed traffic is allowed\",\"type\":\"string\"},{\"example\":\"Field must be a boolean\",\"type\":\"string\"}]},\"type\":\"array\"},\"market\":{\"items\":{\"oneOf\":[{\"example\":\"Field is required\",\"type\":\"string\"},{\"example\":\"Market 'xy' not found\",\"type\":\"string\"}]},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad Request\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your project's API-Key.\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v2/offer/bulk","segments":[{"lit":"v2"},{"lit":"offer"},{"lit":"bulk"}],"select":{"$action":"bulk","exist":["ean","is_couponing","market","merchant_id","placement_id"]},"transform":{"req":"`reqdata`","res":"`body.ean`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"offer","name__orig":"offer","Name":"Offer","name_":"offer","name-":"offer","NAME":"OFFER","index$":9}, {"active":true,"entity":"offer","key$":"BasicOfferFlow","kind":"basic","name":"BasicOfferFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"offer_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"offer_ref01","srcdatavar":"offer_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-offer_ref01"}}],"index$":1}]}, 'Offer')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let offer_ref01_data = Object.values(setup.data.existing.offer)[0] as any

    // LIST
    const offer_ref01_ent = client.Offer()
    const offer_ref01_match: any = {}

    const offer_ref01_list = (await offer_ref01_ent.list(offer_ref01_match)).map((e: any) => e.data())


    // LOAD
    const offer_ref01_match_dt0: any = {}
    offer_ref01_match_dt0.id = offer_ref01_data.id
    const offer_ref01_data_dt0 = (await offer_ref01_ent.load(offer_ref01_match_dt0)).data()
    assert(offer_ref01_data_dt0.id === offer_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/offer/OfferTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = YadorePublisherSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['offer01','offer02','offer03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YADORE_PUBLISHER_TEST_OFFER_ENTID': idmap,
    'YADORE_PUBLISHER_TEST_LIVE': 'FALSE',
    'YADORE_PUBLISHER_TEST_EXPLAIN': 'FALSE',
    'YADORE_PUBLISHER_APIKEY': '',
  })

  idmap = env['YADORE_PUBLISHER_TEST_OFFER_ENTID']

  const live = 'TRUE' === env.YADORE_PUBLISHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YADORE_PUBLISHER_TEST_OFFER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new YadorePublisherSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.YADORE_PUBLISHER_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.YADORE_PUBLISHER_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
