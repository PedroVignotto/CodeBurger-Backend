import { makeCategoryRepository } from '@/main/factories/infra/database/postgres/repositories'
import { ListCategories } from '@/domain/use-cases/category'

export const makeListCategoriesUseCase = (): ListCategories =>
  makeCategoryRepository().list.bind(makeCategoryRepository())
