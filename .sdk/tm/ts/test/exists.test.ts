
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { YadorePublisherSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = YadorePublisherSDK.test()
    equal(testsdk instanceof YadorePublisherSDK, true,
      'YadorePublisherSDK.test() must return a client synchronously')
  })

})
