

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"date":{"a":true,"fo":"date","h":"Date","n":"date","r":false,"t":"`$STRING`","key$":"date","index$":0},"modifiedDate":{"a":true,"fo":"date-time","h":"Modified Date","n":"modifiedDate","r":false,"t":"`$STRING`","key$":"modifiedDate","index$":1}},"name":"report_modified","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/report/modified","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"from","or":"from","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"market","or":"market","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"to","or":"to","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/report/modified","q":{"exist":["from","market","to"]},"r":{},"s":[{"lit":"v2"},{"lit":"report"},{"lit":"modified"}],"t":{"req":"`reqdata`","res":"`body.market`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"report_modified","name__orig":"report_modified","Name":"ReportModified","name_":"report_modified","name-":"report-modified","NAME":"REPORT_MODIFIED","index$":12}, {"active":true,"entity":"report_modified","key$":"BasicReportModifiedFlow","kind":"basic","name":"BasicReportModifiedFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"report_modified_ref01","srcdatavar":"report_modified_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-report_modified_ref01"}}],"index$":0}]}, 'ReportModified', {"GET /v2/report/modified":{"protocol":"http","operationId":"getReportModifiedDetail","responses":{"200":{"description":"Report Modified Response","content":{"application/json":{"schema":{"type":"object","properties":{"market":{"key$":"market","properties":{"date":{"format":"date","type":"string","key$":"date"},"modifiedDate":{"format":"date-time","type":"string","key$":"modifiedDate"}},"type":"object","index$":0}},"x-ref":"#/components/schemas/ReportModifiedResponse"}}}}},"parameters":[{"name":"from","description":"Starting date for which to generate list of modified reports dates. This parameter has to be in format `YYYY-mm-dd`","in":"query","required":true,"schema":{"type":"string","format":"date"},"index$":0},{"name":"to","description":"Ending date for which to generate list of modified reports dates. This parameter has to be in format `YYYY-mm-dd`","in":"query","required":true,"schema":{"type":"string","format":"date"},"index$":1},{"name":"market","description":"Market to search. You will receive a list with valid Markets along with your account information and keys.","in":"query","required":false,"schema":{"type":"string","format":"ISO 3166 Alpha-2"},"index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"API-Key","description":"Your project's API-Key."}}}})
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
  
