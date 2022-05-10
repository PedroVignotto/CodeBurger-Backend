import { AddCategoryRepository, CheckCategoryByNameRepository } from '@/domain/contracts/database/repositories/category'
import { FieldInUseError } from '@/domain/errors'

type Setup = (categoryRepository: CheckCategoryByNameRepository & AddCategoryRepository) => AddCategory
type Input = { name: string }
type Output = { id: string, name: string }
export type AddCategory = (input: Input) => Promise<Output>

export const addCategoryUseCase: Setup = categoryRepository => async ({ name }) => {
  const category = await categoryRepository.checkByName({ name })

  if (category) throw new FieldInUseError('name')

  return await categoryRepository.create({ name })
}
