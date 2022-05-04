import { LoadProductsRepository } from '@/domain/contracts/database/repositories/product'

type Setup = (productRepository: LoadProductsRepository) => AddOrder
type Input = { productsId: string[] }
type Output = void
export type AddOrder = (input: Input) => Promise<Output>

export const addOrderUseCase: Setup = productRepository => async ({ productsId }) => {
  await productRepository.loadAll({ productsId })
}
