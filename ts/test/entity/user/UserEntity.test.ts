

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


describe('UserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENSENSEMAP_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENSENSEMAP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpensensemapSDK.test()
    const ent = testsdk.User()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENSENSEMAP_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"boxes","req":false,"short":"Array of senseBox IDs owned by the user","type":"`$ARRAY`","index$":0},{"active":true,"format":"date-time","name":"createdAt","req":false,"short":"Account creation timestamp","type":"`$STRING`","index$":1},{"active":true,"format":"email","name":"email","req":false,"short":"User's email address","type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"short":"Unique identifier for the user","type":"`$STRING`","index$":3},{"active":true,"name":"name","req":false,"short":"User's name","type":"`$STRING`","index$":4},{"active":true,"name":"role","req":false,"short":"User's role","type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"user","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /users/register","json":"{\"operationId\":\"registerUser\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"email\":{\"description\":\"User's email address\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"User's name\",\"type\":\"string\"},\"password\":{\"description\":\"User's password\",\"format\":\"password\",\"type\":\"string\"}},\"required\":[\"name\",\"email\",\"password\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the user\",\"type\":\"string\"},\"boxes\":{\"description\":\"Array of senseBox IDs owned by the user\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"createdAt\":{\"description\":\"Account creation timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"description\":\"User's email address\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"User's name\",\"type\":\"string\"},\"role\":{\"description\":\"User's role\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"User registered successfully\"},\"400\":{\"description\":\"Invalid input\"},\"409\":{\"description\":\"User already exists\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/users/register","segments":[{"lit":"users"},{"lit":"register"}],"select":{"$action":"register"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"POST /users/sign-in","json":"{\"operationId\":\"signInUser\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"email\":{\"description\":\"User's email address\",\"format\":\"email\",\"type\":\"string\"},\"password\":{\"description\":\"User's password\",\"format\":\"password\",\"type\":\"string\"}},\"required\":[\"email\",\"password\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"token\":{\"description\":\"JWT access token\",\"type\":\"string\"},\"user\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the user\",\"type\":\"string\"},\"boxes\":{\"description\":\"Array of senseBox IDs owned by the user\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"createdAt\":{\"description\":\"Account creation timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"description\":\"User's email address\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"User's name\",\"type\":\"string\"},\"role\":{\"description\":\"User's role\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Sign in successful\"},\"401\":{\"description\":\"Invalid credentials\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/users/sign-in","segments":[{"lit":"users"},{"lit":"sign-in"}],"select":{"$action":"sign_in"},"transform":{"req":"`reqdata`","res":"`body.user`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /users/me","json":"{\"operationId\":\"getCurrentUser\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the user\",\"type\":\"string\"},\"boxes\":{\"description\":\"Array of senseBox IDs owned by the user\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"createdAt\":{\"description\":\"Account creation timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"description\":\"User's email address\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"User's name\",\"type\":\"string\"},\"role\":{\"description\":\"User's role\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"description\":\"Unauthorized\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/users/me","segments":[{"lit":"users"},{"lit":"me"}],"select":{"$action":"me"},"transform":{"req":"`reqdata`","res":"`body.boxes`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"user","name__orig":"user","Name":"User","name_":"user","name-":"user","NAME":"USER","index$":3}, {"active":true,"entity":"user","key$":"BasicUserFlow","kind":"basic","name":"BasicUserFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"user_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"user_ref01"}}],"index$":1}]}, 'User')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const user_ref01_ent = client.User()
    let user_ref01_data = setup.data.new.user['user_ref01']

    user_ref01_data = (await user_ref01_ent.create(user_ref01_data)).data()
    assert(null != user_ref01_data.id)


    // LIST
    const user_ref01_match: any = {}

    const user_ref01_list = (await user_ref01_ent.list(user_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(user_ref01_list, { id: user_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/user/UserTestData.json')

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
    ['user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENSENSEMAP_TEST_USER_ENTID': idmap,
    'OPENSENSEMAP_TEST_LIVE': 'FALSE',
    'OPENSENSEMAP_TEST_EXPLAIN': 'FALSE',
    'OPENSENSEMAP_APIKEY': '',
  })

  idmap = env['OPENSENSEMAP_TEST_USER_ENTID']

  const live = 'TRUE' === env.OPENSENSEMAP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENSENSEMAP_TEST_USER_ENTID']
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
  
