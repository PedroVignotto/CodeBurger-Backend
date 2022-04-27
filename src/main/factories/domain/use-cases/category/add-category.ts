import { makeCategoryRepository } from '@/main/factories/infra/database/postgres/repositories'
import { AddCategory, addCategoryUseCase } from '@/domain/use-cases/category'

export const makeAddCategoryUseCase = (): AddCategory => {
  return addCategoryUseCase(makeCategoryRepository())
}
