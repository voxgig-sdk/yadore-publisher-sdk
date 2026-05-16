
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { YadorePublisherSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await YadorePublisherSDK.test()
    equal(null !== testsdk, true)
  })

})
