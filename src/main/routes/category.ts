import { expressRouterAdapter as adapt } from '@/main/adapters'
import { makeAddCategoryController, makeDeleteCategoryController, makeListCategoriesController } from '@/main/factories/application/controllers/category'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.use(auth)
  router.post('/category', adapt(makeAddCategoryController()))
  router.get('/categories', adapt(makeListCategoriesController()))
  router.delete('/category/:id', adapt(makeDeleteCategoryController()))
}
