

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


describe('ReportModifiedEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YADORE_PUBLISHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('YADORE_PUBLISHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YadorePublisherSDK.test()
    const ent = testsdk.ReportModified()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YADORE_PUBLISHER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'report_modified.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date","name":"date","req":false,"type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"modifiedDate","req":false,"type":"`$STRING`","index$":1}],"name":"report_modified","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"from","orig":"from","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"market","orig":"market","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"to","orig":"to","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /v2/report/modified","json":"{\"operationId\":\"getReportModifiedDetail\",\"parameters\":[{\"description\":\"Starting date for which to generate list of modified reports dates. This parameter has to be in format `YYYY-mm-dd`\",\"in\":\"query\",\"name\":\"from\",\"required\":true,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Ending date for which to generate list of modified reports dates. This parameter has to be in format `YYYY-mm-dd`\",\"in\":\"query\",\"name\":\"to\",\"required\":true,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Market to search. You will receive a list with valid Markets along with your account information and keys.\",\"in\":\"query\",\"name\":\"market\",\"required\":false,\"schema\":{\"format\":\"ISO 3166 Alpha-2\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"market\":{\"properties\":{\"date\":{\"format\":\"date\",\"type\":\"string\"},\"modifiedDate\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Report Modified Response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your project's API-Key.\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v2/report/modified","segments":[{"lit":"v2"},{"lit":"report"},{"lit":"modified"}],"select":{"exist":["from","market","to"]},"transform":{"req":"`reqdata`","res":"`body.market`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"report_modified","name__orig":"report_modified","Name":"ReportModified","name_":"report_modified","name-":"report-modified","NAME":"REPORT_MODIFIED","index$":12}, {"active":true,"entity":"report_modified","key$":"BasicReportModifiedFlow","kind":"basic","name":"BasicReportModifiedFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"report_modified_ref01","srcdatavar":"report_modified_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-report_modified_ref01"}}],"index$":0}]}, 'ReportModified')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let report_modified_ref01_data = Object.values(setup.data.existing.report_modified)[0] as any

    // LOAD
    const report_modified_ref01_ent = client.ReportModified()
    const report_modified_ref01_match_dt0: any = {}
    const report_modified_ref01_data_dt0 = (await report_modified_ref01_ent.load(report_modified_ref01_match_dt0)).data()
    assert(null != report_modified_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/report_modified/ReportModifiedTestData.json')

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
    ['report_modified01','report_modified02','report_modified03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YADORE_PUBLISHER_TEST_REPORT_MODIFIED_ENTID': idmap,
    'YADORE_PUBLISHER_TEST_LIVE': 'FALSE',
    'YADORE_PUBLISHER_TEST_EXPLAIN': 'FALSE',
    'YADORE_PUBLISHER_APIKEY': '',
  })

  idmap = env['YADORE_PUBLISHER_TEST_REPORT_MODIFIED_ENTID']

  const live = 'TRUE' === env.YADORE_PUBLISHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YADORE_PUBLISHER_TEST_REPORT_MODIFIED_ENTID']
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
  
