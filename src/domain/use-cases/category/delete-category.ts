import { CheckCategoryByIdRepository, DeleteCategoryRepository } from '@/domain/contracts/database/repositories/category'

type Setup = (categoryRepository: CheckCategoryByIdRepository & DeleteCategoryRepository) => DeleteCategory
type Input = { id: string }
type Output = boolean
export type DeleteCategory = (input: Input) => Promise<Output>

export const deleteCategoryUseCase: Setup = categoryRepository => async ({ id }) => {
  const category = await categoryRepository.checkById({ id })

  if (!category) return false

  await categoryRepository.delete({ id })

  return true
}
