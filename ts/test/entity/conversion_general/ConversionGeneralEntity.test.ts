

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


describe('ConversionGeneralEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YADORE_PUBLISHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('YADORE_PUBLISHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YadorePublisherSDK.test()
    const ent = testsdk.ConversionGeneral()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YADORE_PUBLISHER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'conversion_general.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"date":{"a":true,"h":"Date","n":"date","r":false,"t":"`$OBJECT`","key$":"date","index$":0},"market":{"a":true,"h":"Market","n":"market","r":false,"t":"`$OBJECT`","key$":"market","index$":1},"total":{"a":true,"h":"Total","n":"total","r":false,"t":"`$OBJECT`","key$":"total","index$":2}},"name":"conversion_general","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/conversion/general","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"format","or":"format","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"from","or":"from","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"to","or":"to","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/conversion/general","q":{"exist":["format","from","to"]},"r":{},"s":[{"lit":"v2"},{"lit":"conversion"},{"lit":"general"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"conversion_general","name__orig":"conversion_general","Name":"ConversionGeneral","name_":"conversion_general","name-":"conversion-general","NAME":"CONVERSION_GENERAL","index$":2}, {"active":true,"entity":"conversion_general","key$":"BasicConversionGeneralFlow","kind":"basic","name":"BasicConversionGeneralFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"conversion_general_ref01","srcdatavar":"conversion_general_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-conversion_general_ref01"}}],"index$":0}]}, 'ConversionGeneral', {"GET /v2/conversion/general":{"protocol":"http","operationId":"getConversionGeneral","responses":{"200":{"description":"Report General Response","content":{"application/json":{"schema":{"type":"object","properties":{"date":{"key$":"date","properties":{"from":{"format":"date","type":"string","x-ref":"#/components/schemas/Date"},"to":{"format":"date","type":"string","x-ref":"#/components/schemas/Date"}},"type":"object","x-ref":"#/components/schemas/DateRange"},"total":{"key$":"total","properties":{"clickCount":{"example":"123","type":"integer"},"sales":{"example":"42","type":"integer"}},"type":"object"},"market":{"key$":"market","properties":{"ch":{"properties":{"total":{"properties":{"clickCount":{"example":"123","type":"integer"},"sales":{"example":"42","type":"integer"}},"type":"object"}},"type":"object"},"de":{"properties":{"total":{"properties":{"clickCount":{"example":"123","type":"integer"},"sales":{"example":"42","type":"integer"}},"type":"object"}},"type":"object"}},"type":"object"}},"x-ref":"#/components/schemas/ConversionGeneralResponse","index$":0}},"text/csv":{"schema":{"example":"\"market\",\"sales\"\n\"de\",\"432\"\n\"br\",\"23\"\n"}}}}},"parameters":[{"name":"from","description":"Starting date for which to generate the report. This parameter has to be in format `YYYY-mm-dd`","in":"query","required":true,"schema":{"type":"string","format":"date"},"index$":0},{"name":"to","description":"Ending date for which to generate the report. This parameter has to be in format `YYYY-mm-dd`","in":"query","required":true,"schema":{"type":"string","format":"date"},"index$":1},{"name":"format","description":"A format to generate the reports. Available formats are `json` and `csv`.","in":"query","required":true,"schema":{"type":"string","enum":["json","csv"]},"x-ref":"#/components/parameters/Format","index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"API-Key","description":"Your project's API-Key."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let conversion_general_ref01_data = Object.values(setup.data.existing.conversion_general)[0] as any

    // LOAD
    const conversion_general_ref01_ent = client.ConversionGeneral()
    const conversion_general_ref01_match_dt0: any = {}
    const conversion_general_ref01_data_dt0 = (await conversion_general_ref01_ent.load(conversion_general_ref01_match_dt0)).data()
    assert(null != conversion_general_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/conversion_general/ConversionGeneralTestData.json')

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
    ['conversion_general01','conversion_general02','conversion_general03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YADORE_PUBLISHER_TEST_CONVERSION_GENERAL_ENTID': idmap,
    'YADORE_PUBLISHER_TEST_LIVE': 'FALSE',
    'YADORE_PUBLISHER_TEST_EXPLAIN': 'FALSE',
    'YADORE_PUBLISHER_APIKEY': '',
  })

  idmap = env['YADORE_PUBLISHER_TEST_CONVERSION_GENERAL_ENTID']

  const live = 'TRUE' === env.YADORE_PUBLISHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YADORE_PUBLISHER_TEST_CONVERSION_GENERAL_ENTID']
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
  
