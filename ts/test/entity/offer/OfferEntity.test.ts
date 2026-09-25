

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"availability":{"a":true,"h":"Availability","n":"availability","r":false,"t":"`$STRING`","key$":"availability","index$":0},"brand":{"a":true,"h":"Brand","n":"brand","r":false,"t":"`$STRING`","key$":"brand","index$":1},"clickUrl":{"a":true,"h":"Click Url","n":"clickUrl","r":false,"t":"`$STRING`","key$":"clickUrl","index$":2},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":3},"eer":{"a":true,"h":"Eer","n":"eer","r":false,"t":"`$STRING`","key$":"eer","index$":4},"estimatedCpc":{"a":true,"h":"Estimated Cpc","n":"estimatedCpc","r":false,"sh":"estimatedCPC means the gross revenue per click Yadore gets from its merchants, you have to use your revenue share to get your estimatedCPC.","t":"`$OBJECT`","key$":"estimatedCpc","index$":5},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":6},"image":{"a":true,"h":"Image","n":"image","r":false,"t":"`$OBJECT`","key$":"image","index$":7},"merchant":{"a":true,"h":"Merchant","n":"merchant","r":false,"t":"`$OBJECT`","key$":"merchant","index$":8},"originalPrice":{"a":true,"h":"Original Price","n":"originalPrice","r":false,"t":"`$OBJECT`","key$":"originalPrice","index$":9},"price":{"a":true,"h":"Price","n":"price","r":false,"t":"`$OBJECT`","key$":"price","index$":10},"promoText":{"a":true,"h":"Promo Text","n":"promoText","r":false,"t":"`$STRING`","key$":"promoText","index$":11},"shippingPrice":{"a":true,"h":"Shipping Price","n":"shippingPrice","r":false,"t":"`$OBJECT`","key$":"shippingPrice","index$":12},"shippingTime":{"a":true,"h":"Shipping Time","n":"shippingTime","r":false,"t":"`$OBJECT`","key$":"shippingTime","index$":13},"thumbnail":{"a":true,"h":"Thumbnail","n":"thumbnail","r":false,"t":"`$OBJECT`","key$":"thumbnail","index$":14},"title":{"a":true,"h":"Title","n":"title","r":false,"t":"`$STRING`","key$":"title","index$":15},"unitPrice":{"a":true,"h":"Unit Price","n":"unitPrice","r":false,"t":"`$OBJECT`","key$":"unitPrice","index$":16}},"id":{"field":"id","name":"id"},"name":"offer","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/offer","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"ean","or":"ean","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"is_couponing","or":"is_couponing","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"k":"query","n":"keyword","or":"keyword","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"market","or":"market","r":true,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"merchant_id","or":"merchant_id","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"offer_id","or":"offer_id","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"placement_id","or":"placement_id","r":false,"t":"`$STRING`","index$":7},{"a":true,"ex":"fuzzy","k":"query","n":"precision","or":"precision","r":false,"t":"`$STRING`","index$":8},{"a":true,"ex":"rel_desc","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":9}]},"k":"http","m":"GET","o":"/v2/offer","q":{"exist":["ean","is_couponing","keyword","limit","market","merchant_id","offer_id","placement_id","precision","sort"]},"r":{},"s":[{"lit":"v2"},{"lit":"offer"}],"t":{"req":"`reqdata`","res":"`body.offers`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/offer/bulk","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"12345678,87654321","k":"query","n":"ean","or":"ean","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"is_couponing","or":"is_couponing","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"k":"query","n":"market","or":"market","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"merchant_id","or":"merchant_id","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"placement_id","or":"placement_id","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/v2/offer/bulk","q":{"$action":"bulk","exist":["ean","is_couponing","market","merchant_id","placement_id"]},"r":{},"s":[{"lit":"v2"},{"lit":"offer"},{"lit":"bulk"}],"t":{"req":"`reqdata`","res":"`body.ean`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"offer","name__orig":"offer","Name":"Offer","name_":"offer","name-":"offer","NAME":"OFFER","index$":9}, {"active":true,"entity":"offer","key$":"BasicOfferFlow","kind":"basic","name":"BasicOfferFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"offer_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"offer_ref01","srcdatavar":"offer_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-offer_ref01"}}],"index$":1}]}, 'Offer', {"GET /v2/offer":{"protocol":"http","operationId":"getOffer","responses":{"200":{"description":"Offer Response","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"key$":"count","type":"integer"},"total":{"key$":"total","type":"integer"},"offers":{"items":{"properties":{"availability":{"enum":["AVAILABLE","UNAVAILABLE","UNKNOWN","SOON","PREORDER","AVAILABLE ON ORDER","STOCK ON ORDER","BACKORDER"],"type":"string","key$":"availability"},"brand":{"nullable":true,"type":"string","key$":"brand"},"clickUrl":{"type":"string","key$":"clickUrl"},"description":{"type":"string","key$":"description"},"eer":{"nullable":true,"type":"string","key$":"eer"},"estimatedCpc":{"description":"estimatedCPC means the gross revenue per click Yadore gets from its merchants,\nyou have to use your revenue share to get your estimatedCPC.\nBe aware, the CPC paid can still differ from the estimated CPC\n","properties":{"amount":{"type":"string"},"currency":{"type":"string"}},"type":"object","key$":"estimatedCpc"},"id":{"type":"string","key$":"id"},"image":{"properties":{"url":{"type":"string"}},"type":"object","key$":"image"},"merchant":{"properties":{"id":{"type":"string"},"logo":{"properties":{"exists":{"type":"boolean"},"url":{"type":"string"}},"type":"object"},"name":{"type":"string"}},"type":"object","key$":"merchant"},"originalPrice":{"properties":{"amount":{"type":"string"},"currency":{"type":"string"}},"type":"object","key$":"originalPrice"},"price":{"properties":{"amount":{"type":"string"},"currency":{"type":"string"}},"type":"object","key$":"price"},"promoText":{"nullable":true,"type":"string","key$":"promoText"},"shippingPrice":{"properties":{"amount":{"type":"string"},"currency":{"type":"string"}},"type":"object","key$":"shippingPrice"},"shippingTime":{"properties":{"text":{"type":"string"}},"type":"object","key$":"shippingTime"},"thumbnail":{"properties":{"url":{"type":"string"}},"type":"object","key$":"thumbnail"},"title":{"type":"string","key$":"title"},"unitPrice":{"properties":{"text":{"nullable":true,"type":"string"}},"type":"object","key$":"unitPrice"}},"type":"object","x-ref":"#/components/schemas/Offer","index$":0},"key$":"offers","type":"array"}},"x-ref":"#/components/schemas/OfferResponse"}}}},"400":{"description":"Bad Request","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"object","properties":{"isCouponing":{"type":"array","items":{"oneOf":[{"type":"string","example":"Field is required when mixed traffic is allowed"},{"type":"string","example":"Field must be a boolean"}]},"x-ref":"#/components/schemas/isCouponingError"},"market":{"type":"array","items":{"oneOf":[{"type":"string","example":"Field is required"},{"type":"string","example":"Market 'xy' not found"}]},"x-ref":"#/components/schemas/marketError"}}}},"x-ref":"#/components/schemas/OfferErrorResponse"}}}}},"parameters":[{"name":"market","description":"Market to search. You can get the markets you are activated for with the Markets API.","in":"query","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Market","index$":0},{"name":"keyword","description":"Keyword to search. Must be at least one character long.","in":"query","required":false,"schema":{"type":"string"},"x-ref":"#/components/parameters/Keyword","index$":1},{"name":"ean","description":"Filter the results by this EAN. Must be `8`, `13` or `14` characters long. When omitted, you will get offers regardless of an ean.","in":"query","required":false,"schema":{"type":"string"},"x-ref":"#/components/parameters/EAN","index$":2},{"name":"merchantId","description":"Merchant ID to filter the offers. You can use this parameter to narrow the results. If omitted, you will get offers for all merchants.","in":"query","required":false,"schema":{"type":"string"},"x-ref":"#/components/parameters/MerchantId","index$":3},{"name":"offerId","description":"Offer ID to filter the offers. If set you will only get this one offer, if it is found and active.","in":"query","required":false,"schema":{"type":"string"},"x-ref":"#/components/parameters/OfferId","index$":4},{"name":"placementId","description":"Your own subID for your click-tracking. Must be at most 128 characters long. Only printable ASCII-characters are allowed. Defaults to `null`.","in":"query","required":false,"schema":{"type":"string"},"x-ref":"#/components/parameters/PlacementId","index$":5},{"name":"precision","description":"Precision for the fulltext search. `strict` uses a more strict approach to get more relevant results. `fuzzy` uses a less strict approach to get more results.","in":"query","required":false,"schema":{"type":"string","enum":["strict","fuzzy"],"default":"fuzzy"},"x-ref":"#/components/parameters/Precision","index$":6},{"name":"sort","description":"Sort the results by relevance or price. Allowed values are `rel_desc`, `price_asc`, `price_desc`. Defaults to `rel_desc`. It is only possible to sort the results by relevance if you also specify a keyword. Without the keyword, the sort order is undefined.","in":"query","required":false,"schema":{"type":"string","enum":["rel_desc","price_asc","price_desc"],"default":"rel_desc"},"x-ref":"#/components/parameters/Sort","index$":7},{"name":"limit","description":"Limit of results, must be between `1` and `100`. Defaults to `20`.","in":"query","required":false,"schema":{"type":"integer"},"x-ref":"#/components/parameters/Limit","index$":8},{"name":"isCouponing","description":"If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not. If you don’t use this parameter when your project is labeled _“mixed”_ your traffic will not get paid. If you want to find out the label, please ask your account manager. You only must use this parameter if you have mixed traffic. If you have either couponing or no couponing traffic, this parameter is not important for you.\n","in":"query","required":false,"schema":{"type":"boolean"},"x-ref":"#/components/parameters/IsCouponing","index$":9}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"API-Key","description":"Your project's API-Key."}}},"GET /v2/offer/bulk":{"protocol":"http","operationId":"getOffersByEan","responses":{"200":{"description":"Offer Ean Bulk Response","content":{"application/json":{"schema":{"type":"object","properties":{"ean":{"key$":"ean","properties":{"count":{"type":"integer"},"offers":{"items":{"properties":{"availability":{"enum":["AVAILABLE","UNAVAILABLE","UNKNOWN","SOON","PREORDER","AVAILABLE ON ORDER","STOCK ON ORDER","BACKORDER"],"type":"string"},"brand":{"nullable":true,"type":"string"},"clickUrl":{"type":"string"},"description":{"type":"string"},"eer":{"nullable":true,"type":"string"},"estimatedCpc":{"description":"estimatedCPC means the gross revenue per click Yadore gets from its merchants,\nyou have to use your revenue share to get your estimatedCPC.\nBe aware, the CPC paid can still differ from the estimated CPC\n","properties":{"amount":{"type":"string"},"currency":{"type":"string"}},"type":"object"},"id":{"type":"string"},"image":{"properties":{"url":{"type":"string"}},"type":"object"},"merchant":{"properties":{"id":{"type":"string"},"logo":{"properties":{"exists":{"type":"boolean"},"url":{"type":"string"}},"type":"object"},"name":{"type":"string"}},"type":"object"},"originalPrice":{"properties":{"amount":{"type":"string"},"currency":{"type":"string"}},"type":"object"},"price":{"properties":{"amount":{"type":"string"},"currency":{"type":"string"}},"type":"object"},"promoText":{"nullable":true,"type":"string"},"shippingPrice":{"properties":{"amount":{"type":"string"},"currency":{"type":"string"}},"type":"object"},"shippingTime":{"properties":{"text":{"type":"string"}},"type":"object"},"thumbnail":{"properties":{"url":{"type":"string"}},"type":"object"},"title":{"type":"string"},"unitPrice":{"properties":{"text":{"nullable":true,"type":"string"}},"type":"object"}},"type":"object","x-ref":"#/components/schemas/Offer"},"type":"array"}},"type":"object"}},"x-ref":"#/components/schemas/OfferEanBulkResponse"}}}},"400":{"description":"Bad Request","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"object","properties":{"isCouponing":{"type":"array","items":{"oneOf":[{"type":"string","example":"Field is required when mixed traffic is allowed"},{"type":"string","example":"Field must be a boolean"}]},"x-ref":"#/components/schemas/isCouponingError"},"market":{"type":"array","items":{"oneOf":[{"type":"string","example":"Field is required"},{"type":"string","example":"Market 'xy' not found"}]},"x-ref":"#/components/schemas/marketError"},"ean":{"type":"array","items":{"oneOf":[{"type":"string","example":"EAN list cant be empty"},{"type":"string","example":"Cant request offers for more then 50 EANs at once"}]},"x-ref":"#/components/schemas/eanError"}}}},"x-ref":"#/components/schemas/OfferBulkErrorResponse"}}}}},"parameters":[{"name":"market","description":"Market to search. You can get the markets you are activated for with the Markets API.","in":"query","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Market","index$":0},{"name":"eans","description":"The EANs to search (max. 50). Must be an comma seperated list of valid EANs. Each EAN must be `8`, `13` or `14` characters long.","in":"query","required":true,"schema":{"type":"string","example":"12345678,87654321"},"x-ref":"#/components/parameters/EANs","index$":1},{"name":"merchantId","description":"Merchant ID to filter the offers. You can use this parameter to narrow the results. If omitted, you will get offers for all merchants.","in":"query","required":false,"schema":{"type":"string"},"x-ref":"#/components/parameters/MerchantId","index$":2},{"name":"placementId","description":"Your own subID for your click-tracking. Must be at most 128 characters long. Only printable ASCII-characters are allowed. Defaults to `null`.","in":"query","required":false,"schema":{"type":"string"},"x-ref":"#/components/parameters/PlacementId","index$":3},{"name":"isCouponing","description":"If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not. If you don’t use this parameter when your project is labeled _“mixed”_ your traffic will not get paid. If you want to find out the label, please ask your account manager. You only must use this parameter if you have mixed traffic. If you have either couponing or no couponing traffic, this parameter is not important for you.\n","in":"query","required":false,"schema":{"type":"boolean"},"x-ref":"#/components/parameters/IsCouponing","index$":4}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"API-Key","description":"Your project's API-Key."}}}})
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
  
