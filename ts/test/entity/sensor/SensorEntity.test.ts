

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


describe('SensorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENSENSEMAP_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENSENSEMAP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpensensemapSDK.test()
    const ent = testsdk.Sensor()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENSENSEMAP_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'sensor.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"icon","req":false,"short":"Icon identifier for the sensor","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Unique identifier for the sensor","type":"`$STRING`","index$":1},{"active":true,"name":"lastMeasurement","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"sensorType","req":false,"short":"Type of sensor","type":"`$STRING`","index$":3},{"active":true,"name":"title","req":false,"short":"Title of the sensor","type":"`$STRING`","index$":4},{"active":true,"name":"unit","req":false,"short":"Unit of measurement","type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"sensor","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"box_id","orig":"box_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /boxes/{boxId}/sensors","json":"{\"operationId\":\"getBoxSensors\",\"parameters\":[{\"description\":\"ID of the senseBox\",\"in\":\"path\",\"name\":\"boxId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the sensor\",\"type\":\"string\"},\"icon\":{\"description\":\"Icon identifier for the sensor\",\"type\":\"string\"},\"lastMeasurement\":{\"properties\":{\"createdAt\":{\"description\":\"Timestamp of the measurement\",\"format\":\"date-time\",\"type\":\"string\"},\"value\":{\"description\":\"Measurement value\",\"type\":\"string\"}},\"type\":\"object\"},\"sensorType\":{\"description\":\"Type of sensor\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the sensor\",\"type\":\"string\"},\"unit\":{\"description\":\"Unit of measurement\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"SenseBox not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/boxes/{boxId}/sensors","rename":{"param":{"boxId":"box_id"}},"segments":[{"lit":"boxes"},{"var":"box_id"},{"lit":"sensors"}],"select":{"exist":["box_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["box"]]},"key$":"sensor","name__orig":"sensor","Name":"Sensor","name_":"sensor","name-":"sensor","NAME":"SENSOR","index$":1}, {"active":true,"entity":"sensor","key$":"BasicSensorFlow","kind":"basic","name":"BasicSensorFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"box_id":"box01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"sensor_ref01"}}],"index$":0}]}, 'Sensor')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let sensor_ref01_data = Object.values(setup.data.existing.sensor)[0] as any

    // LIST
    const sensor_ref01_ent = client.Sensor()
    const sensor_ref01_match: any = {}
    sensor_ref01_match['box_id'] = setup.idmap['box01']

    const sensor_ref01_list = (await sensor_ref01_ent.list(sensor_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/sensor/SensorTestData.json')

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
    ['sensor01','sensor02','sensor03','box01','box02','box03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENSENSEMAP_TEST_SENSOR_ENTID': idmap,
    'OPENSENSEMAP_TEST_LIVE': 'FALSE',
    'OPENSENSEMAP_TEST_EXPLAIN': 'FALSE',
    'OPENSENSEMAP_APIKEY': '',
  })

  idmap = env['OPENSENSEMAP_TEST_SENSOR_ENTID']

  const live = 'TRUE' === env.OPENSENSEMAP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENSENSEMAP_TEST_SENSOR_ENTID']
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
  
