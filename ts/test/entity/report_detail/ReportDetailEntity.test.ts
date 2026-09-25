

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


describe('ReportDetailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YADORE_PUBLISHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('YADORE_PUBLISHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YadorePublisherSDK.test()
    const ent = testsdk.ReportDetail()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YADORE_PUBLISHER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'report_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"clickId":{"a":true,"h":"Click Id","n":"clickId","r":false,"t":"`$STRING`","key$":"clickId","index$":0},"currency":{"a":true,"h":"Currency","n":"currency","r":false,"t":"`$STRING`","key$":"currency","index$":1},"date":{"a":true,"fo":"date-time","h":"Date","n":"date","r":false,"t":"`$STRING`","key$":"date","index$":2},"market":{"a":true,"h":"Market","n":"market","r":false,"t":"`$STRING`","key$":"market","index$":3},"merchant":{"a":true,"h":"Merchant","n":"merchant","r":false,"t":"`$OBJECT`","key$":"merchant","index$":4},"placementId":{"a":true,"h":"Placement Id","n":"placementId","r":false,"t":"`$STRING`","key$":"placementId","index$":5},"revenue":{"a":true,"h":"Revenue","n":"revenue","r":false,"t":"`$NUMBER`","key$":"revenue","index$":6}},"name":"report_detail","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/report/detail","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"date","or":"date","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"market","or":"market","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/report/detail","q":{"exist":["date","format","market"]},"r":{},"s":[{"lit":"v2"},{"lit":"report"},{"lit":"detail"}],"t":{"req":"`reqdata`","res":"`body.clicks`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"report_detail","name__orig":"report_detail","Name":"ReportDetail","name_":"report_detail","name-":"report-detail","NAME":"REPORT_DETAIL","index$":10}, {"active":true,"entity":"report_detail","key$":"BasicReportDetailFlow","kind":"basic","name":"BasicReportDetailFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"report_detail_ref01"}}],"index$":0}]}, 'ReportDetail', {"GET /v2/report/detail":{"protocol":"http","operationId":"getReportDetail","responses":{"200":{"description":"Report Detail Response","content":{"application/json":{"schema":{"type":"object","properties":{"totalClicks":{"key$":"totalClicks","type":"integer"},"clicks":{"items":{"properties":{"clickId":{"type":"string","key$":"clickId"},"currency":{"example":"EUR","type":"string","key$":"currency"},"date":{"format":"date-time","type":"string","key$":"date"},"market":{"type":"string","key$":"market"},"merchant":{"properties":{"id":{"type":"string"},"name":{"type":"string"}},"type":"object","key$":"merchant"},"placementId":{"type":"string","key$":"placementId"},"revenue":{"type":"number","key$":"revenue"}},"type":"object","index$":0},"key$":"clicks","type":"array"}},"x-ref":"#/components/schemas/ReportDetailResponse"}},"text/csv":{"schema":{"example":"\"clickId\",\"date\",\"placementId\",\"market\",\"merchantId\",\"merchantName\",\"revenue\",\"currency\"\n\"532f889fd3ba56f628f3234647d9854650534789938b7fdaafddf1d75081fadc\",\"2018-01-01T00:00:01+00:00\",\"your-custom-placement-id-1\",\"de\",\"583c1b14c50391777b40ee033a04cef033271e35307f7276125b2ba760d4b48e\",\"example.com\",\"0.142898\",\"EUR\"\n\"ae7facb00d557e7d92e1d2ee31bc05cc9787bc6802e636ccb284cfbaeb6680b8\",\"2018-01-01T00:00:02+00:00\",\"your-custom-placement-id-2\",\"de\",\"583c1b14c50391777b40ee033a04cef033271e35307f7276125b2ba760d4b48e\",\"example.com\",\"0.142825\",\"EUR\"\n\"8bc875e7f5260fa14b21797508b9e47ee2df2c2fe0351b88edded847ee59bb1f\",\"2018-01-01T00:00:03+00:00\",\"your-custom-placement-id-3\",\"de\",\"583c1b14c50391777b40ee033a04cef033271e35307f7276125b2ba760d4b48e\",\"example.com\",\"0.120417\",\"EUR\"\n"}}}}},"parameters":[{"name":"date","description":"Date for which to generate a report. This date is in the UTC timezone. This parameter has to be in format `YYYY-mm-dd`, for example `2018-01-31`.","in":"query","required":true,"schema":{"type":"string","format":"date"},"x-ref":"#/components/parameters/Date","index$":0},{"name":"format","description":"A format to generate the reports. Available formats are `json` and `csv`.","in":"query","required":true,"schema":{"type":"string","enum":["json","csv"]},"x-ref":"#/components/parameters/Format","index$":1},{"name":"market","description":"Market to search. You can get the markets you are activated for with the Markets API.","in":"query","required":false,"schema":{"type":"string"},"x-ref":"#/components/parameters/ReportMarket","index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"API-Key","description":"Your project's API-Key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let report_detail_ref01_data = Object.values(setup.data.existing.report_detail)[0] as any

    // LIST
    const report_detail_ref01_ent = client.ReportDetail()
    const report_detail_ref01_match: any = {}

    const report_detail_ref01_list = (await report_detail_ref01_ent.list(report_detail_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/report_detail/ReportDetailTestData.json')

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
    ['report_detail01','report_detail02','report_detail03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YADORE_PUBLISHER_TEST_REPORT_DETAIL_ENTID': idmap,
    'YADORE_PUBLISHER_TEST_LIVE': 'FALSE',
    'YADORE_PUBLISHER_TEST_EXPLAIN': 'FALSE',
    'YADORE_PUBLISHER_APIKEY': '',
  })

  idmap = env['YADORE_PUBLISHER_TEST_REPORT_DETAIL_ENTID']

  const live = 'TRUE' === env.YADORE_PUBLISHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YADORE_PUBLISHER_TEST_REPORT_DETAIL_ENTID']
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
  
