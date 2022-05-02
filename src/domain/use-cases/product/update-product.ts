import { CheckProductByIdRepository } from '@/domain/contracts/database/repositories/product'
import { NonExistentFieldError } from '@/domain/errors'

type Setup = (productRepository: CheckProductByIdRepository) => UpdateProduct
type Input = { id: string }
type Output = undefined | Error
export type UpdateProduct = (input: Input) => Promise<Output>

export const updateProductUseCase: Setup = productRepository => async ({ id }) => {
  await productRepository.checkById({ id })

  return new NonExistentFieldError('id')
}
