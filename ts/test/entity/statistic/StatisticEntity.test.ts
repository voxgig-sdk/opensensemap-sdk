

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OpensensemapSDK, BaseFeature, stdutil } from '../../..'

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


describe('StatisticEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENSENSEMAP_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENSENSEMAP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpensensemapSDK.test()
    const ent = testsdk.Statistic()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENSENSEMAP_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'statistic.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"count","req":false,"short":"Number of measurements","type":"`$INTEGER`","index$":0},{"active":true,"name":"max","req":false,"short":"Maximum value","type":"`$NUMBER`","index$":1},{"active":true,"name":"mean","req":false,"short":"Mean value","type":"`$NUMBER`","index$":2},{"active":true,"name":"median","req":false,"short":"Median value","type":"`$NUMBER`","index$":3},{"active":true,"name":"min","req":false,"short":"Minimum value","type":"`$NUMBER`","index$":4},{"active":true,"name":"sum","req":false,"short":"Sum of all values","type":"`$NUMBER`","index$":5}],"name":"statistic","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"box_id","orig":"box_id","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"from_date","orig":"from_date","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"sensor_id","orig":"sensor_id","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"to_date","orig":"to_date","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /statistics/descriptive","json":"{\"operationId\":\"getDescriptiveStatistics\",\"parameters\":[{\"description\":\"ID of the senseBox\",\"in\":\"query\",\"name\":\"boxId\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"ID of the sensor\",\"in\":\"query\",\"name\":\"sensorId\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Start date for statistics (ISO 8601 format)\",\"in\":\"query\",\"name\":\"from-date\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"End date for statistics (ISO 8601 format)\",\"in\":\"query\",\"name\":\"to-date\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"description\":\"Number of measurements\",\"type\":\"integer\"},\"max\":{\"description\":\"Maximum value\",\"type\":\"number\"},\"mean\":{\"description\":\"Mean value\",\"type\":\"number\"},\"median\":{\"description\":\"Median value\",\"type\":\"number\"},\"min\":{\"description\":\"Minimum value\",\"type\":\"number\"},\"sum\":{\"description\":\"Sum of all values\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/statistics/descriptive","segments":[{"lit":"statistics"},{"lit":"descriptive"}],"select":{"$action":"descriptive","exist":["box_id","from_date","sensor_id","to_date"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"statistic","name__orig":"statistic","Name":"Statistic","name_":"statistic","name-":"statistic","NAME":"STATISTIC","index$":2}, {"active":true,"entity":"statistic","key$":"BasicStatisticFlow","kind":"basic","name":"BasicStatisticFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"statistic_ref01","srcdatavar":"statistic_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-statistic_ref01"}}],"index$":0}]}, 'Statistic')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let statistic_ref01_data = Object.values(setup.data.existing.statistic)[0] as any

    // LOAD
    const statistic_ref01_ent = client.Statistic()
    const statistic_ref01_match_dt0: any = {}
    const statistic_ref01_data_dt0 = (await statistic_ref01_ent.load(statistic_ref01_match_dt0)).data()
    assert(null != statistic_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/statistic/StatisticTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OpensensemapSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['statistic01','statistic02','statistic03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENSENSEMAP_TEST_STATISTIC_ENTID': idmap,
    'OPENSENSEMAP_TEST_LIVE': 'FALSE',
    'OPENSENSEMAP_TEST_EXPLAIN': 'FALSE',
    'OPENSENSEMAP_APIKEY': '',
  })

  idmap = env['OPENSENSEMAP_TEST_STATISTIC_ENTID']

  const live = 'TRUE' === env.OPENSENSEMAP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENSENSEMAP_TEST_STATISTIC_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OpensensemapSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.OPENSENSEMAP_APIKEY,
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
    explain: 'TRUE' === env.OPENSENSEMAP_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
