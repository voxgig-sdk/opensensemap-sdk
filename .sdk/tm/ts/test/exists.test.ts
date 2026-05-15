
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpensensemapSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await OpensensemapSDK.test()
    equal(null !== testsdk, true)
  })

})
