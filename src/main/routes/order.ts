import { expressRouterAdapter as adapt } from '@/main/adapters'
import { makeAddOrderController, makeListOrdersController } from '@/main/factories/application/controllers/order'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/order', auth, adapt(makeAddOrderController()))
  router.get('/orders', auth, adapt(makeListOrdersController()))
}
