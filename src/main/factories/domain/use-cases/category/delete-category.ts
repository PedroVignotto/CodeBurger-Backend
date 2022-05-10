import { makeCategoryRepository } from '@/main/factories/infra/database/postgres/repositories'
import { DeleteCategory, deleteCategoryUseCase } from '@/domain/use-cases/category'

export const makeDeleteCategoryUseCase = (): DeleteCategory =>
  deleteCategoryUseCase(makeCategoryRepository())
