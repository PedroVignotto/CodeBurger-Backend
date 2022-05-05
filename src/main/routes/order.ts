import { expressRouterAdapter as adapt } from '@/main/adapters'
import { makeAddOrderController, makeListOrdersController, makeUpdateOrderController } from '@/main/factories/application/controllers/order'
import { auth, authAdmin } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/order', auth, adapt(makeAddOrderController()))
  router.get('/orders', auth, adapt(makeListOrdersController()))
  router.put('/order/:id', authAdmin, adapt(makeUpdateOrderController()))
}
