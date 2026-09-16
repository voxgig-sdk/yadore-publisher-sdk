

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


describe('DeeplinkMerchantEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YADORE_PUBLISHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('YADORE_PUBLISHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YadorePublisherSDK.test()
    const ent = testsdk.DeeplinkMerchant()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YADORE_PUBLISHER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deeplink_merchant.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"deeplinkCount","req":false,"short":"Even when a merchant has no deeplinks, it might still have smartlinks.","type":"`$INTEGER`","index$":0},{"active":true,"name":"estimatedCpc","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"hasExternalHomepage","req":false,"short":"If the merchant accept homepage deeplinks.","type":"`$BOOLEAN`","index$":2},{"active":true,"name":"hasSmartlinkHomepage","req":false,"short":"If the merchant accept homepage smartlinks.","type":"`$BOOLEAN`","index$":3},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"isSmartlink","req":false,"short":"If the merchant has one or more smartlinks.","type":"`$BOOLEAN`","index$":5},{"active":true,"name":"logo","req":false,"type":"`$OBJECT`","index$":6},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":7},{"active":true,"name":"trafficTypes","req":false,"type":"`$ARRAY`","index$":8}],"id":{"field":"id","name":"id"},"name":"deeplink_merchant","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"has_homepage","orig":"has_homepage","reqd":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"kind":"query","name":"is_couponing","orig":"is_couponing","reqd":false,"type":"`$BOOLEAN`","index$":1},{"active":true,"kind":"query","name":"is_smartlink","orig":"is_smartlink","reqd":false,"type":"`$BOOLEAN`","index$":2},{"active":true,"kind":"query","name":"market","orig":"market","reqd":true,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /v2/deeplink/merchant","json":"{\"operationId\":\"getDeeplinkMerchant\",\"parameters\":[{\"description\":\"Market to search. You can get the markets you are activated for with the Markets API.\",\"in\":\"query\",\"name\":\"market\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Set to 1 to limit results to smartlink merchants only. If omitted, you will get results for all merchants.\",\"in\":\"query\",\"name\":\"isSmartlink\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Set to 1 to limit results to homepage merchants only. If omitted, you will get results for all merchants.\",\"in\":\"query\",\"name\":\"hasHomepage\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"If your project has mixed traffic, you can filter the merchants by using this parameter.\",\"in\":\"query\",\"name\":\"isCouponing\",\"required\":false,\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"merchants\":{\"items\":{\"properties\":{\"deeplinkCount\":{\"description\":\"Even when a merchant has no deeplinks, it might still have smartlinks.\",\"type\":\"integer\"},\"estimatedCpc\":{\"properties\":{\"amount\":{\"nullable\":true,\"type\":\"string\"},\"currency\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"hasExternalHomepage\":{\"description\":\"If the merchant accept homepage deeplinks.\",\"type\":\"boolean\"},\"hasSmartlinkHomepage\":{\"description\":\"If the merchant accept homepage smartlinks.\",\"type\":\"boolean\"},\"id\":{\"type\":\"string\"},\"isSmartlink\":{\"description\":\"If the merchant has one or more smartlinks.\",\"type\":\"boolean\"},\"logo\":{\"properties\":{\"exists\":{\"type\":\"boolean\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"trafficTypes\":{\"items\":{\"properties\":{\"permission\":{\"enum\":[\"not_allowed\",\"allowed\"],\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Deeplink Merchant Response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your project's API-Key.\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v2/deeplink/merchant","segments":[{"lit":"v2"},{"lit":"deeplink"},{"lit":"merchant"}],"select":{"exist":["has_homepage","is_couponing","is_smartlink","market"]},"transform":{"req":"`reqdata`","res":"`body.merchants`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"deeplink_merchant","name__orig":"deeplink_merchant","Name":"DeeplinkMerchant","name_":"deeplink_merchant","name-":"deeplink-merchant","NAME":"DEEPLINK_MERCHANT","index$":5}, {"active":true,"entity":"deeplink_merchant","key$":"BasicDeeplinkMerchantFlow","kind":"basic","name":"BasicDeeplinkMerchantFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"deeplink_merchant_ref01"}}],"index$":0}]}, 'DeeplinkMerchant')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let deeplink_merchant_ref01_data = Object.values(setup.data.existing.deeplink_merchant)[0] as any

    // LIST
    const deeplink_merchant_ref01_ent = client.DeeplinkMerchant()
    const deeplink_merchant_ref01_match: any = {}

    const deeplink_merchant_ref01_list = (await deeplink_merchant_ref01_ent.list(deeplink_merchant_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/deeplink_merchant/DeeplinkMerchantTestData.json')

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
    ['deeplink_merchant01','deeplink_merchant02','deeplink_merchant03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YADORE_PUBLISHER_TEST_DEEPLINK_MERCHANT_ENTID': idmap,
    'YADORE_PUBLISHER_TEST_LIVE': 'FALSE',
    'YADORE_PUBLISHER_TEST_EXPLAIN': 'FALSE',
    'YADORE_PUBLISHER_APIKEY': '',
  })

  idmap = env['YADORE_PUBLISHER_TEST_DEEPLINK_MERCHANT_ENTID']

  const live = 'TRUE' === env.YADORE_PUBLISHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YADORE_PUBLISHER_TEST_DEEPLINK_MERCHANT_ENTID']
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
  
