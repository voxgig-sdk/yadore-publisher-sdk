

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


describe('ReportGeneralEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YADORE_PUBLISHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('YADORE_PUBLISHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YadorePublisherSDK.test()
    const ent = testsdk.ReportGeneral()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YADORE_PUBLISHER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'report_general.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"date","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"market","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"total","req":false,"type":"`$OBJECT`","index$":2}],"name":"report_general","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"date","orig":"date","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"format","orig":"format","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /v2/report/general","json":"{\"operationId\":\"getReportGeneral\",\"parameters\":[{\"description\":\"Date for which to generate a report. This date is in the UTC timezone. This parameter has to be in format `YYYY-mm-dd`, for example `2018-01-31`.\",\"in\":\"query\",\"name\":\"date\",\"required\":true,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"A format to generate the reports. Available formats are `json` and `csv`.\",\"in\":\"query\",\"name\":\"format\",\"required\":true,\"schema\":{\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"date\":{\"properties\":{\"from\":{\"type\":\"string\"},\"to\":{\"type\":\"string\"}},\"type\":\"object\"},\"market\":{\"properties\":{\"de\":{\"properties\":{\"total\":{\"properties\":{\"clicks\":{\"type\":\"integer\"},\"currency\":{\"type\":\"string\"},\"revenue\":{\"example\":0,\"type\":\"number\"}},\"type\":\"object\"}},\"type\":\"object\"}},\"type\":\"object\"},\"total\":{\"properties\":{\"clicks\":{\"type\":\"integer\"},\"currency\":{\"type\":\"string\"},\"revenue\":{\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}},\"text/csv\":{\"schema\":{\"example\":\"\\\"date\\\",\\\"market\\\",\\\"clicks\\\",\\\"revenue\\\",\\\"currency\\\"\\n\\\"2018-01-01\\\",\\\"de\\\",\\\"1000\\\",\\\"100.1234\\\",\\\"EUR\\\"\\n\\\"2018-01-01\\\",\\\"fr\\\",\\\"2000\\\",\\\"150.5678\\\",\\\"EUR\\\"\\n\\\"2018-01-01\\\",\\\"it\\\",\\\"1500\\\",\\\"125.6542\\\",\\\"EUR\\\"\\n\",\"type\":\"string\"}}},\"description\":\"Report General Response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your project's API-Key.\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v2/report/general","segments":[{"lit":"v2"},{"lit":"report"},{"lit":"general"}],"select":{"exist":["date","format"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"report_general","name__orig":"report_general","Name":"ReportGeneral","name_":"report_general","name-":"report-general","NAME":"REPORT_GENERAL","index$":11}, {"active":true,"entity":"report_general","key$":"BasicReportGeneralFlow","kind":"basic","name":"BasicReportGeneralFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"report_general_ref01","srcdatavar":"report_general_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-report_general_ref01"}}],"index$":0}]}, 'ReportGeneral')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let report_general_ref01_data = Object.values(setup.data.existing.report_general)[0] as any

    // LOAD
    const report_general_ref01_ent = client.ReportGeneral()
    const report_general_ref01_match_dt0: any = {}
    const report_general_ref01_data_dt0 = (await report_general_ref01_ent.load(report_general_ref01_match_dt0)).data()
    assert(null != report_general_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/report_general/ReportGeneralTestData.json')

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
    ['report_general01','report_general02','report_general03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YADORE_PUBLISHER_TEST_REPORT_GENERAL_ENTID': idmap,
    'YADORE_PUBLISHER_TEST_LIVE': 'FALSE',
    'YADORE_PUBLISHER_TEST_EXPLAIN': 'FALSE',
    'YADORE_PUBLISHER_APIKEY': '',
  })

  idmap = env['YADORE_PUBLISHER_TEST_REPORT_GENERAL_ENTID']

  const live = 'TRUE' === env.YADORE_PUBLISHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YADORE_PUBLISHER_TEST_REPORT_GENERAL_ENTID']
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
  
