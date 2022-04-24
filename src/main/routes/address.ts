import { expressRouterAdapter as adapt } from '@/main/adapters'
import { makeLoadAddressByZipCodeController } from '@/main/factories/application/controllers/address'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/address/:zipCode', auth, adapt(makeLoadAddressByZipCodeController()))
}
