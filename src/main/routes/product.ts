import { expressRouterAdapter as adapt, multerAdapter as upload } from '@/main/adapters'
import { makeAddProductController, makeListProductsController, makeUpdateProductController } from '@/main/factories/application/controllers/product'
import { auth, authAdmin } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/product', authAdmin, upload, adapt(makeAddProductController()))
  router.get('/products', auth, adapt(makeListProductsController()))
  router.put('/product/:id', authAdmin, upload, adapt(makeUpdateProductController()))
}
