import { AddCategoryRepository, CheckCategoryByNameRepository } from '@/domain/contracts/database/repositories/category'

type Setup = (categoryRepository: CheckCategoryByNameRepository & AddCategoryRepository) => AddCategory
type Input = { name: string }
type Output = boolean
export type AddCategory = (input: Input) => Promise<Output>

export const addCategoryUseCase: Setup = categoryRepository => async ({ name }) => {
  const category = await categoryRepository.checkByName({ name })

  if (category) return false

  await categoryRepository.create({ name })

  return true
}
