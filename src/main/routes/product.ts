import { expressRouterAdapter as adapt } from '@/main/adapters'
import { makeAddProductController } from '@/main/factories/application/controllers/product'
import { authAdmin } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/product', authAdmin, adapt(makeAddProductController()))
}
