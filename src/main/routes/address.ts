import { expressRouterAdapter as adapt } from '@/main/adapters'
import { makeAddAddressController, makeListAddressesController, makeLoadAddressByZipCodeController, makeUpdateAddressController } from '@/main/factories/application/controllers/address'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/address/:zipCode', auth, adapt(makeLoadAddressByZipCodeController()))
  router.post('/address', auth, adapt(makeAddAddressController()))
  router.get('/addresses', auth, adapt(makeListAddressesController()))
  router.put('/address/:id', auth, adapt(makeUpdateAddressController()))
}
