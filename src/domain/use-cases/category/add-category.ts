import { AddCategoryRepository, CheckCategoryByNameRepository } from '@/domain/contracts/database/repositories/category'
import { FieldInUseError } from '@/domain/errors'

type Setup = (categoryRepository: CheckCategoryByNameRepository & AddCategoryRepository) => AddCategory
type Input = { name: string }
type Output = { id: string, name: string } | Error
export type AddCategory = (input: Input) => Promise<Output>

export const addCategoryUseCase: Setup = categoryRepository => async ({ name }) => {
  const categoryExists = await categoryRepository.checkByName({ name })

  if (categoryExists) return new FieldInUseError('name')

  const category = await categoryRepository.create({ name })

  return category
}
