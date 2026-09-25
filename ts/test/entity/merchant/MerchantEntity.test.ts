

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


describe('MerchantEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YADORE_PUBLISHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('YADORE_PUBLISHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YadorePublisherSDK.test()
    const ent = testsdk.Merchant()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YADORE_PUBLISHER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'merchant.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"logo":{"a":true,"h":"Logo","n":"logo","r":false,"t":"`$OBJECT`","key$":"logo","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":2},"offerCount":{"a":true,"h":"Offer Count","n":"offerCount","r":false,"t":"`$INTEGER`","key$":"offerCount","index$":3},"trafficTypes":{"a":true,"h":"Traffic Types","n":"trafficTypes","r":false,"t":"`$ARRAY`","key$":"trafficTypes","index$":4}},"id":{"field":"id","name":"id"},"name":"merchant","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/merchant","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"is_couponing","or":"is_couponing","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"k":"query","n":"market","or":"market","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/merchant","q":{"exist":["is_couponing","market"]},"r":{},"s":[{"lit":"v2"},{"lit":"merchant"}],"t":{"req":"`reqdata`","res":"`body.merchants`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"merchant","name__orig":"merchant","Name":"Merchant","name_":"merchant","name-":"merchant","NAME":"MERCHANT","index$":8}, {"active":true,"entity":"merchant","key$":"BasicMerchantFlow","kind":"basic","name":"BasicMerchantFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"merchant_ref01"}}],"index$":0}]}, 'Merchant', {"GET /v2/merchant":{"protocol":"http","operationId":"getMerchant","responses":{"200":{"description":"Merchant Response","content":{"application/json":{"schema":{"type":"object","properties":{"total":{"key$":"total","type":"integer"},"merchants":{"items":{"properties":{"id":{"type":"string","key$":"id"},"logo":{"properties":{"exists":{"type":"boolean"},"url":{"type":"string"}},"type":"object","key$":"logo"},"name":{"type":"string","key$":"name"},"offerCount":{"type":"integer","key$":"offerCount"},"trafficTypes":{"items":{"properties":{"permission":{"enum":["not_allowed","allowed"],"type":"string"},"type":{"type":"string"}},"type":"object"},"type":"array","key$":"trafficTypes"}},"type":"object","index$":0},"key$":"merchants","type":"array"}},"x-ref":"#/components/schemas/MerchantResponse"}}}}},"parameters":[{"name":"market","description":"Market to search. You can get the markets you are activated for with the Markets API.","in":"query","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Market","index$":0},{"name":"isCouponing","description":"If your project has mixed traffic, you can filter the merchants by using this parameter.","in":"query","required":false,"schema":{"type":"boolean"},"x-ref":"#/components/parameters/IsCouponingMerchantFilter","index$":1}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"API-Key","description":"Your project's API-Key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let merchant_ref01_data = Object.values(setup.data.existing.merchant)[0] as any

    // LIST
    const merchant_ref01_ent = client.Merchant()
    const merchant_ref01_match: any = {}

    const merchant_ref01_list = (await merchant_ref01_ent.list(merchant_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/merchant/MerchantTestData.json')

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
    ['merchant01','merchant02','merchant03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YADORE_PUBLISHER_TEST_MERCHANT_ENTID': idmap,
    'YADORE_PUBLISHER_TEST_LIVE': 'FALSE',
    'YADORE_PUBLISHER_TEST_EXPLAIN': 'FALSE',
    'YADORE_PUBLISHER_APIKEY': '',
  })

  idmap = env['YADORE_PUBLISHER_TEST_MERCHANT_ENTID']

  const live = 'TRUE' === env.YADORE_PUBLISHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YADORE_PUBLISHER_TEST_MERCHANT_ENTID']
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
  
