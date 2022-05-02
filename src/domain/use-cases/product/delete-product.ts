import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { NonExistentFieldError } from '@/domain/errors'

type Setup = (productRepository: LoadProductRepository) => DeleteProduct
type Input = { id: string }
type Output = Error
export type DeleteProduct = (input: Input) => Promise<Output>

export const deleteProductUseCase: Setup = productRepository => async ({ id }) => {
  await productRepository.load({ id })

  return new NonExistentFieldError('id')
}
