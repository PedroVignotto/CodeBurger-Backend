import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { CheckProductByIdRepository, CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'

type Setup = (productRepository: CheckProductByIdRepository & CheckProductByNameRepository, categoryRepository: CheckCategoryByIdRepository) => UpdateProduct
type Input = { id: string, name?: string, categoryId?: string }
type Output = undefined | Error
export type UpdateProduct = (input: Input) => Promise<Output>

export const updateProductUseCase: Setup = (productRepository, categoryRepository) => async ({ id, name, categoryId }) => {
  const productNotExists = await productRepository.checkById({ id })

  if (!productNotExists) return new NonExistentFieldError('id')

  if (name) {
    const productExists = await productRepository.checkByName({ name })

    if (productExists) return new FieldInUseError('name')
  }

  if (categoryId) {
    const categoryExists = await categoryRepository.checkById({ id: categoryId })

    if (!categoryExists) return new NonExistentFieldError('categoryId')
  }
}
