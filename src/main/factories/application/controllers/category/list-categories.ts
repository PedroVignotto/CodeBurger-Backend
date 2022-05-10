import { makeListCategoriesUseCase } from '@/main/factories/domain/use-cases/category'
import { ListCategoriesController } from '@/application/controllers/category'

export const makeListCategoriesController = (): ListCategoriesController =>
  new ListCategoriesController(makeListCategoriesUseCase())
