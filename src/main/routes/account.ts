import { expressRouterAdapter as adapt } from '@/main/adapters'
import { makeSignUpController } from '@/main/factories/application/controllers'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/accounts', adapt(makeSignUpController()))
}
