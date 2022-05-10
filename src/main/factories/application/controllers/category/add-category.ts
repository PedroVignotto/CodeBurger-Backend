import { makeAddCategoryUseCase } from '@/main/factories/domain/use-cases/category'
import { AddCategoryController } from '@/application/controllers/category'

export const makeAddCategoryController = (): AddCategoryController =>
  new AddCategoryController(makeAddCategoryUseCase())
