import { expressRouterAdapter as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'
import { makeAddCategoryController } from '@/main/factories/application/controllers/category'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/category', auth, adapt(makeAddCategoryController()))
}
