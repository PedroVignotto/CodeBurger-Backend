import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'

type Setup = (productRepository: CheckProductByNameRepository, categoryRepository: CheckCategoryByIdRepository) => AddProduct
type Input = { categoryId: string, name: string }
type Output = undefined | Error
export type AddProduct = (input: Input) => Promise<Output>

export const addProductUseCase: Setup = (productRepository, categoryRepository) => async ({ categoryId, name }) => {
  const productExists = await productRepository.checkByName({ name })

  if (productExists) return new FieldInUseError('name')

  await categoryRepository.checkById({ id: categoryId })

  return new NonExistentFieldError('categoryId')
}
