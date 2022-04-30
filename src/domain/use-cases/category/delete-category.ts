import { CheckCategoryByIdRepository, DeleteCategoryRepository } from '@/domain/contracts/database/repositories/category'
import { NonExistentFieldError } from '@/domain/errors'

type Setup = (categoryRepository: CheckCategoryByIdRepository & DeleteCategoryRepository) => DeleteCategory
type Input = { id: string }
type Output = undefined | Error
export type DeleteCategory = (input: Input) => Promise<Output>

export const deleteCategoryUseCase: Setup = categoryRepository => async ({ id }) => {
  const category = await categoryRepository.checkById({ id })

  if (!category) return new NonExistentFieldError('id')

  await categoryRepository.delete({ id })
}
