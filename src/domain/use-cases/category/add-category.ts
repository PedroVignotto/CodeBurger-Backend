import { AddCategoryRepository, CheckCategoryByNameRepository } from '@/domain/contracts/database/repositories/category'
import { FieldInUseError } from '@/domain/errors'

type Setup = (categoryRepository: CheckCategoryByNameRepository & AddCategoryRepository) => AddCategory
type Input = { name: string }
type Output = undefined | Error
export type AddCategory = (input: Input) => Promise<Output>

export const addCategoryUseCase: Setup = categoryRepository => async ({ name }) => {
  const category = await categoryRepository.checkByName({ name })

  if (category) return new FieldInUseError('name')

  await categoryRepository.create({ name })
}
