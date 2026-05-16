
import { Context } from './Context'


class YadorePublisherError extends Error {

  isYadorePublisherError = true

  sdk = 'YadorePublisher'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  YadorePublisherError
}

