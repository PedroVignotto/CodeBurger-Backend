import { CheckCategoryByNameRepository } from '@/domain/contracts/database/repositories/category'

type Setup = (categoryRepository: CheckCategoryByNameRepository) => AddCategory
type Input = { name: string }
type Output = boolean
export type AddCategory = (input: Input) => Promise<Output>

export const addCategoryUseCase: Setup = categoryRepository => async ({ name }) => {
  await categoryRepository.checkByName({ name })

  return false
}
