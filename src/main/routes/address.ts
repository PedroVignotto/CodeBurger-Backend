import { expressRouterAdapter as adapt } from '@/main/adapters'
import { makeAddAddressController, makeDeleteAddressController, makeListAddressesController, makeLoadAddressByZipCodeController, makeUpdateAddressController } from '@/main/factories/application/controllers/address'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.use(auth)
  router.get('/address/:zipCode', adapt(makeLoadAddressByZipCodeController()))
  router.post('/address', adapt(makeAddAddressController()))
  router.get('/addresses', adapt(makeListAddressesController()))
  router.put('/address/:id', adapt(makeUpdateAddressController()))
  router.delete('/address/:id', adapt(makeDeleteAddressController()))
}
