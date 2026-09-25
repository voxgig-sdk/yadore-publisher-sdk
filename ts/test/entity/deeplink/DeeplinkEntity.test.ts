

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


describe('DeeplinkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YADORE_PUBLISHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('YADORE_PUBLISHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YadorePublisherSDK.test()
    const ent = testsdk.Deeplink()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YADORE_PUBLISHER_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deeplink.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"deeplinks":{"a":true,"h":"Deeplinks","n":"deeplinks","r":false,"t":"`$ARRAY`","key$":"deeplinks","index$":0},"found":{"a":true,"h":"Found","n":"found","r":false,"t":"`$INTEGER`","key$":"found","index$":1},"isCouponing":{"a":true,"h":"Is Couponing","n":"isCouponing","r":false,"sh":"If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not.","t":"`$BOOLEAN`","key$":"isCouponing","index$":2},"market":{"a":true,"h":"Market","n":"market","r":true,"sh":"The market to query.","t":"`$STRING`","key$":"market","index$":3},"placementId":{"a":true,"h":"Placement Id","n":"placementId","r":false,"sh":"Your own subID for your click-tracking.","t":"`$STRING`","key$":"placementId","index$":4},"total":{"a":true,"h":"Total","n":"total","r":false,"t":"`$INTEGER`","key$":"total","index$":5},"urls":{"a":true,"h":"Urls","n":"urls","r":true,"sh":"An array of URLs","t":"`$ARRAY`","key$":"urls","index$":6}},"name":"deeplink","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/deeplink","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/deeplink","q":{},"r":{},"s":[{"lit":"v2"},{"lit":"deeplink"}],"t":{"req":"`reqdata`","res":"`body.result`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"deeplink","name__orig":"deeplink","Name":"Deeplink","name_":"deeplink","name-":"deeplink","NAME":"DEEPLINK","index$":4}, {"active":true,"entity":"deeplink","key$":"BasicDeeplinkFlow","kind":"basic","name":"BasicDeeplinkFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"deeplink_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Deeplink', {"POST /v2/deeplink":{"protocol":"http","operationId":"postDeeplink","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"market":{"description":"The market to query.","required":true,"type":"string","key$":"market"},"placementId":{"description":"Your own subID for your click-tracking. Must be at most 128 characters long. Only printable ASCII-characters are allowed. Defaults to null.","required":false,"type":"string","key$":"placementId"},"isCouponing":{"name":"isCouponing","description":"If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not. If you don’t use this parameter when your project is labeled _“mixed”_ your traffic will not get paid. If you want to find out the label, please ask your account manager. You only must use this parameter if you have mixed traffic. If you have either couponing or no couponing traffic, this parameter is not important for you.\n","required":false,"type":"boolean","key$":"isCouponing"},"urls":{"description":"An array of URLs","required":true,"type":"array","items":{"type":"object","properties":{"url":{"type":"string"}}},"key$":"urls"}},"x-ref":"#/components/schemas/Deeplink","index$":1}}},"x-ref":"#/components/requestBodies/Deeplink"},"responses":{"200":{"description":"Deeplink Response","content":{"application/json":{"schema":{"type":"object","properties":{"result":{"type":"object","properties":{"found":{"type":"integer","key$":"found"},"total":{"type":"integer","key$":"total"},"deeplinks":{"type":"array","items":{"type":"object","properties":{"url":{"type":"string"},"found":{"type":"boolean"},"clickUrl":{"type":"string","nullable":true,"description":"The clickUrl is only valid for 14 days."},"merchant":{"type":"object","nullable":true,"properties":{"logo":{"type":"object","properties":{"url":{"type":"string"},"exists":{"type":"boolean"}}}}},"estimatedCpc":{"type":"object","properties":{"amount":{"type":"string","nullable":true},"currency":{"type":"string","nullable":true}}}}},"key$":"deeplinks"}},"index$":0}},"x-ref":"#/components/schemas/DeeplinkResponse"}}}}},"parameters":[],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"API-Key","description":"Your project's API-Key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const deeplink_ref01_ent = client.Deeplink()
    let deeplink_ref01_data = setup.data.new.deeplink['deeplink_ref01']

    deeplink_ref01_data = (await deeplink_ref01_ent.create(deeplink_ref01_data)).data()
    assert(null != deeplink_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/deeplink/DeeplinkTestData.json')

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
    ['deeplink01','deeplink02','deeplink03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YADORE_PUBLISHER_TEST_DEEPLINK_ENTID': idmap,
    'YADORE_PUBLISHER_TEST_LIVE': 'FALSE',
    'YADORE_PUBLISHER_TEST_EXPLAIN': 'FALSE',
    'YADORE_PUBLISHER_APIKEY': '',
  })

  idmap = env['YADORE_PUBLISHER_TEST_DEEPLINK_ENTID']

  const live = 'TRUE' === env.YADORE_PUBLISHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YADORE_PUBLISHER_TEST_DEEPLINK_ENTID']
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
  
