import { makeDeleteCategoryUseCase } from '@/main/factories/domain/use-cases/category'
import { DeleteCategoryController } from '@/application/controllers/category'

export const makeDeleteCategoryController = (): DeleteCategoryController =>
  new DeleteCategoryController(makeDeleteCategoryUseCase())
