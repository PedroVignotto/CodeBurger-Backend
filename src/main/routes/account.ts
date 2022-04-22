import { ExpressRouter as Adapter } from '@/main/adapters'
import { makeSignUpController } from '@/main/factories/application/controllers'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/accounts', new Adapter(makeSignUpController()).adapt)
}
