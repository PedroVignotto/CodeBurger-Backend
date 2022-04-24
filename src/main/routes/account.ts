import { expressRouterAdapter as adapt } from '@/main/adapters'
import { makeLoginController, makeSignUpController } from '@/main/factories/application/controllers/account'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adapt(makeSignUpController()))
  router.post('/login', adapt(makeLoginController()))
}
