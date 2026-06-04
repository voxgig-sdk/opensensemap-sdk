
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


describe('BoxEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENSENSEMAP_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENSENSEMAP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpensensemapSDK.test()
    const ent = testsdk.Box()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENSENSEMAP_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'box.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set OPENSENSEMAP_TEST_BOX_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const box_ref01_ent = client.Box()
    let box_ref01_data = setup.data.new.box['box_ref01']
    box_ref01_data['box_id'] = setup.idmap['box01']
    box_ref01_data['sensor_id'] = setup.idmap['sensor01']

    box_ref01_data = await box_ref01_ent.create(box_ref01_data)
    assert(null != box_ref01_data.id)


    // LIST
    const box_ref01_match: any = {}

    const box_ref01_list = await box_ref01_ent.list(box_ref01_match)

    assert(!isempty(select(box_ref01_list, { id: box_ref01_data.id })))


    // UPDATE
    const box_ref01_data_up0: any = {}
    box_ref01_data_up0.id = box_ref01_data.id

    const box_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-box_ref01_' + setup.now }
    box_ref01_data_up0 [box_ref01_markdef_up0.name] = box_ref01_markdef_up0.value

    const box_ref01_resdata_up0 = await box_ref01_ent.update(box_ref01_data_up0)
    assert(box_ref01_resdata_up0.id === box_ref01_data_up0.id)

    assert(box_ref01_resdata_up0[box_ref01_markdef_up0.name] === box_ref01_markdef_up0.value)


    // LOAD
    const box_ref01_match_dt0: any = {}
    box_ref01_match_dt0.id = box_ref01_data.id
    const box_ref01_data_dt0 = await box_ref01_ent.load(box_ref01_match_dt0)
    assert(box_ref01_data_dt0.id === box_ref01_data.id)


    // REMOVE
    const box_ref01_match_rm0: any = { id: box_ref01_data.id }
    await box_ref01_ent.remove(box_ref01_match_rm0)
  

    // LIST
    const box_ref01_match_rt0: any = {}

    const box_ref01_list_rt0 = await box_ref01_ent.list(box_ref01_match_rt0)

    assert(isempty(select(box_ref01_list_rt0, { id: box_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/box/BoxTestData.json')

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
    ['box01','box02','box03','box01','box02','box03'],
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
  const idmapEnvVal = process.env['OPENSENSEMAP_TEST_BOX_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'OPENSENSEMAP_TEST_BOX_ENTID': idmap,
    'OPENSENSEMAP_TEST_LIVE': 'FALSE',
    'OPENSENSEMAP_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OPENSENSEMAP_TEST_BOX_ENTID']

  const live = 'TRUE' === env.OPENSENSEMAP_TEST_LIVE

  if (live) {
    client = new OpensensemapSDK(merge([
      {
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
  
