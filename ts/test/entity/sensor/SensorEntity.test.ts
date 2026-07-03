
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { OpensensemapSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


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
      if (maybeSkipControl(t, 'entityOp', 'sensor.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set OPENSENSEMAP_TEST_SENSOR_ENTID JSON to run live')
      return
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

    const sensor_ref01_list = await sensor_ref01_ent.list(sensor_ref01_match)


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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['OPENSENSEMAP_TEST_SENSOR_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'OPENSENSEMAP_TEST_SENSOR_ENTID': idmap,
    'OPENSENSEMAP_TEST_LIVE': 'FALSE',
    'OPENSENSEMAP_TEST_EXPLAIN': 'FALSE',
    'OPENSENSEMAP_APIKEY': 'NONE',
  })

  idmap = env['OPENSENSEMAP_TEST_SENSOR_ENTID']

  const live = 'TRUE' === env.OPENSENSEMAP_TEST_LIVE

  if (live) {
    client = new OpensensemapSDK(merge([
      {
        apikey: env.OPENSENSEMAP_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
