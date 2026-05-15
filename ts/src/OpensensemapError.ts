
import { Context } from './Context'


class OpensensemapError extends Error {

  isOpensensemapError = true

  sdk = 'Opensensemap'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  OpensensemapError
}

