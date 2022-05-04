import { LoadProductsRepository } from '@/domain/contracts/database/repositories/product'
import { NonExistentFieldError } from '@/domain/errors'

type Setup = (productRepository: LoadProductsRepository) => AddOrder
type Input = { productsId: string[] }
type Output = undefined | Error
export type AddOrder = (input: Input) => Promise<Output>

export const addOrderUseCase: Setup = productRepository => async ({ productsId }) => {
  const products = await productRepository.loadAll({ productsId })

  if (products.length <= 0) return new NonExistentFieldError('productsId')
}
