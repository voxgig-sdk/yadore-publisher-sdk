

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


describe('ConversionDetailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YADORE_PUBLISHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('YADORE_PUBLISHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YadorePublisherSDK.test()
    const ent = testsdk.ConversionDetail()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YADORE_PUBLISHER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'conversion_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"clickId":{"a":true,"h":"Click Id","n":"clickId","r":false,"t":"`$STRING`","key$":"clickId","index$":0},"date":{"a":true,"fo":"date-time","h":"Date","n":"date","r":false,"t":"`$STRING`","key$":"date","index$":1},"market":{"a":true,"h":"Market","n":"market","r":false,"t":"`$STRING`","key$":"market","index$":2},"merchant":{"a":true,"h":"Merchant","n":"merchant","r":false,"t":"`$OBJECT`","key$":"merchant","index$":3},"placementId":{"a":true,"h":"Placement Id","n":"placementId","r":false,"t":"`$STRING`","key$":"placementId","index$":4},"sales":{"a":true,"h":"Sales","n":"sales","r":false,"t":"`$NUMBER`","key$":"sales","index$":5}},"name":"conversion_detail","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/conversion/detail","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"date","or":"date","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"market","or":"market","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/conversion/detail","q":{"exist":["date","format","market"]},"r":{},"s":[{"lit":"v2"},{"lit":"conversion"},{"lit":"detail"}],"t":{"req":"`reqdata`","res":"`body.clicks`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"conversion_detail","name__orig":"conversion_detail","Name":"ConversionDetail","name_":"conversion_detail","name-":"conversion-detail","NAME":"CONVERSION_DETAIL","index$":0}, {"active":true,"entity":"conversion_detail","key$":"BasicConversionDetailFlow","kind":"basic","name":"BasicConversionDetailFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"conversion_detail_ref01"}}],"index$":0}]}, 'ConversionDetail', {"GET /v2/conversion/detail":{"protocol":"http","operationId":"getConversionDetail","responses":{"200":{"description":"Report Detail Response","content":{"application/json":{"schema":{"type":"object","properties":{"totalClicks":{"key$":"totalClicks","type":"integer"},"clicks":{"items":{"properties":{"clickId":{"type":"string","key$":"clickId"},"date":{"format":"date-time","type":"string","key$":"date"},"market":{"type":"string","key$":"market"},"merchant":{"properties":{"id":{"type":"string"},"name":{"type":"string"}},"type":"object","key$":"merchant"},"placementId":{"type":"string","key$":"placementId"},"sales":{"example":42,"type":"number","key$":"sales"}},"type":"object","index$":0},"key$":"clicks","type":"array"}},"x-ref":"#/components/schemas/ConversionDetailResponse"}},"text/csv":{"schema":{"example":"\"clickId\",\"date\",\"placementId\",\"market\",\"merchantId\",\"merchantName\",\"sales\"\n\"0003a6ba2712bf1eb0bbd1f67846bf70483989b14e9bfe3dfc96596e880d24ec\",\"2022-08-28T11:12:33+00:00\",\"cc3a69ebe06e41ec91c4c60e6de59b604682ca5489464a0ca00ab919497ce8ad\",\"de\",\"ec8408fbcc2f7523b596dec3e9462b50c4511d381780a7c0511e0e603a0c4327\",\"sanicare.de\",\"0\"\n\"00193d37300edc9eee8abe91912a214bc5ba5123e17d65ed5ae28c3810cc47ce\",\"2022-08-28T15:56:32+00:00\",\"preisvergleich-de-o-wl\",\"de\",\"ec8408fbcc2f7523b596dec3e9462b50c4511d381780a7c0511e0e603a0c4327\",\"sanicare.de\",\"0\"\n\"00358068c1e0a8372cd48445b47652e457b658f22050e5b9b2830b919a569636\",\"2022-08-28T12:24:54+00:00\",\"v03040001006029c697c39f3a4a2c8f3b3c277ed44467\",\"de\", \"218a1593ddb9bec9b5566a97efd5d9bf98f9eb10781d5aed06f4ebb1749f2ee9\",\"aboutyou.de\",\"0\"\n"}}}}},"parameters":[{"name":"date","description":"Date for which to generate a report. This date is in the UTC timezone. This parameter has to be in format `YYYY-mm-dd`, for example `2018-01-31`.","in":"query","required":true,"schema":{"type":"string","format":"date"},"x-ref":"#/components/parameters/Date","index$":0},{"name":"format","description":"A format to generate the reports. Available formats are `json` and `csv`.","in":"query","required":true,"schema":{"type":"string","enum":["json","csv"]},"x-ref":"#/components/parameters/Format","index$":1},{"name":"market","description":"Market to search. You can get the markets you are activated for with the Markets API.","in":"query","required":false,"schema":{"type":"string"},"x-ref":"#/components/parameters/ReportMarket","index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"API-Key","description":"Your project's API-Key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let conversion_detail_ref01_data = Object.values(setup.data.existing.conversion_detail)[0] as any

    // LIST
    const conversion_detail_ref01_ent = client.ConversionDetail()
    const conversion_detail_ref01_match: any = {}

    const conversion_detail_ref01_list = (await conversion_detail_ref01_ent.list(conversion_detail_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/conversion_detail/ConversionDetailTestData.json')

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
    ['conversion_detail01','conversion_detail02','conversion_detail03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YADORE_PUBLISHER_TEST_CONVERSION_DETAIL_ENTID': idmap,
    'YADORE_PUBLISHER_TEST_LIVE': 'FALSE',
    'YADORE_PUBLISHER_TEST_EXPLAIN': 'FALSE',
    'YADORE_PUBLISHER_APIKEY': '',
  })

  idmap = env['YADORE_PUBLISHER_TEST_CONVERSION_DETAIL_ENTID']

  const live = 'TRUE' === env.YADORE_PUBLISHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YADORE_PUBLISHER_TEST_CONVERSION_DETAIL_ENTID']
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
  
