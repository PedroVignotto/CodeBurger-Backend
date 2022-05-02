import { CheckProductByIdRepository, CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'

type Setup = (productRepository: CheckProductByIdRepository & CheckProductByNameRepository) => UpdateProduct
type Input = { id: string, name: string }
type Output = undefined | Error
export type UpdateProduct = (input: Input) => Promise<Output>

export const updateProductUseCase: Setup = productRepository => async ({ id, name }) => {
  const productNotExists = await productRepository.checkById({ id })

  if (!productNotExists) return new NonExistentFieldError('id')

  const productExists = await productRepository.checkByName({ name })

  if (productExists) return new FieldInUseError('name')
}
