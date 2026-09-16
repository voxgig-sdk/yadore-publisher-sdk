

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"deeplinks","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"found","req":false,"type":"`$INTEGER`","index$":1},{"active":true,"name":"isCouponing","req":false,"short":"If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not.","type":"`$BOOLEAN`","index$":2},{"active":true,"name":"market","req":true,"short":"The market to query.","type":"`$STRING`","index$":3},{"active":true,"name":"placementId","req":false,"short":"Your own subID for your click-tracking.","type":"`$STRING`","index$":4},{"active":true,"name":"total","req":false,"type":"`$INTEGER`","index$":5},{"active":true,"name":"urls","req":true,"short":"An array of URLs","type":"`$ARRAY`","index$":6}],"name":"deeplink","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /v2/deeplink","json":"{\"operationId\":\"postDeeplink\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"isCouponing\":{\"description\":\"If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not. If you don’t use this parameter when your project is labeled _“mixed”_ your traffic will not get paid. If you want to find out the label, please ask your account manager. You only must use this parameter if you have mixed traffic. If you have either couponing or no couponing traffic, this parameter is not important for you.\\n\",\"name\":\"isCouponing\",\"required\":false,\"type\":\"boolean\"},\"market\":{\"description\":\"The market to query.\",\"required\":true,\"type\":\"string\"},\"placementId\":{\"description\":\"Your own subID for your click-tracking. Must be at most 128 characters long. Only printable ASCII-characters are allowed. Defaults to null.\",\"required\":false,\"type\":\"string\"},\"urls\":{\"description\":\"An array of URLs\",\"items\":{\"properties\":{\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"required\":true,\"type\":\"array\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"result\":{\"properties\":{\"deeplinks\":{\"items\":{\"properties\":{\"clickUrl\":{\"description\":\"The clickUrl is only valid for 14 days.\",\"nullable\":true,\"type\":\"string\"},\"estimatedCpc\":{\"properties\":{\"amount\":{\"nullable\":true,\"type\":\"string\"},\"currency\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"found\":{\"type\":\"boolean\"},\"merchant\":{\"nullable\":true,\"properties\":{\"logo\":{\"properties\":{\"exists\":{\"type\":\"boolean\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"found\":{\"type\":\"integer\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Deeplink Response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your project's API-Key.\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/v2/deeplink","segments":[{"lit":"v2"},{"lit":"deeplink"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.result`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"deeplink","name__orig":"deeplink","Name":"Deeplink","name_":"deeplink","name-":"deeplink","NAME":"DEEPLINK","index$":4}, {"active":true,"entity":"deeplink","key$":"BasicDeeplinkFlow","kind":"basic","name":"BasicDeeplinkFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"deeplink_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Deeplink')
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
  
