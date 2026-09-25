

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


describe('DntEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YADORE_PUBLISHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('YADORE_PUBLISHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YadorePublisherSDK.test()
    const ent = testsdk.Dnt()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YADORE_PUBLISHER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dnt.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"dnt","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/d","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"callback_url","or":"callback_url","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"is_couponing","or":"is_couponing","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"k":"query","n":"market","or":"market","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"merchant_id","or":"merchant_id","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"placement_id","or":"placement_id","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"url","or":"url","r":true,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/v2/d","q":{"exist":["callback_url","is_couponing","market","merchant_id","placement_id","project_id","url"]},"r":{},"s":[{"lit":"v2"},{"lit":"d"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"dnt","name__orig":"dnt","Name":"Dnt","name_":"dnt","name-":"dnt","NAME":"DNT","index$":6}, {"active":true,"entity":"dnt","key$":"BasicDntFlow","kind":"basic","name":"BasicDntFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"dnt_ref01","srcdatavar":"dnt_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dnt_ref01"}}],"index$":0}]}, 'Dnt', {"GET /v2/d":{"protocol":"http","operationId":"doDirectRedirect","responses":{"302":{"description":"A redirect to the target shop website."},"404":{"description":"An error occured and there was no callbackUrl."}},"parameters":[{"name":"url","description":"URL of shop to redirect to. Please copy & paste the URL in this field exactly how it is displayed in the browser.","in":"query","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/SingleUrl","index$":0},{"name":"callbackUrl","description":"The URL to where requests with errors will be redirected to. The callbackUrl has to be whitelisted. If you want to use a callbackUrl please send your URL to your Yadore contact. Omitting this parameter will result in a 404 for results with errors.","in":"query","required":false,"schema":{"type":"string"},"x-ref":"#/components/parameters/CallbackUrl","index$":1},{"name":"market","description":"Market to search. You can get the markets you are activated for with the Markets API.","in":"query","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Market","index$":2},{"name":"merchantId","description":"Merchant ID to filter the offers. You can use this parameter to narrow the results. If omitted, you will get offers for all merchants.","in":"query","required":false,"schema":{"type":"string"},"x-ref":"#/components/parameters/MerchantId","index$":3},{"name":"placementId","description":"Your own subID for your click-tracking. Must be at most 128 characters long. Only printable ASCII-characters are allowed. Defaults to `null`.","in":"query","required":false,"schema":{"type":"string"},"x-ref":"#/components/parameters/PlacementId","index$":4},{"name":"projectId","description":"Your project ID, ask your account manager for your specific project ID.","in":"query","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/ProjectId","index$":5},{"name":"isCouponing","description":"If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not. If you don’t use this parameter when your project is labeled _“mixed”_ your traffic will not get paid. If you want to find out the label, please ask your account manager. You only must use this parameter if you have mixed traffic. If you have either couponing or no couponing traffic, this parameter is not important for you.\n","in":"query","required":false,"schema":{"type":"boolean"},"x-ref":"#/components/parameters/IsCouponing","index$":6}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"API-Key","description":"Your project's API-Key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let dnt_ref01_data = Object.values(setup.data.existing.dnt)[0] as any

    // LOAD
    const dnt_ref01_ent = client.Dnt()
    const dnt_ref01_match_dt0: any = {}
    const dnt_ref01_data_dt0 = (await dnt_ref01_ent.load(dnt_ref01_match_dt0)).data()
    assert(null != dnt_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/dnt/DntTestData.json')

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
    ['dnt01','dnt02','dnt03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YADORE_PUBLISHER_TEST_DNT_ENTID': idmap,
    'YADORE_PUBLISHER_TEST_LIVE': 'FALSE',
    'YADORE_PUBLISHER_TEST_EXPLAIN': 'FALSE',
    'YADORE_PUBLISHER_APIKEY': '',
  })

  idmap = env['YADORE_PUBLISHER_TEST_DNT_ENTID']

  const live = 'TRUE' === env.YADORE_PUBLISHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YADORE_PUBLISHER_TEST_DNT_ENTID']
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
  
