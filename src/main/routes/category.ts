import { expressRouterAdapter as adapt } from '@/main/adapters'
import { makeAddCategoryController, makeDeleteCategoryController, makeListCategoriesController } from '@/main/factories/application/controllers/category'
import { auth, authAdmin } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/category', authAdmin, adapt(makeAddCategoryController()))
  router.get('/categories', auth, adapt(makeListCategoriesController()))
  router.delete('/category/:id', authAdmin, adapt(makeDeleteCategoryController()))
}
