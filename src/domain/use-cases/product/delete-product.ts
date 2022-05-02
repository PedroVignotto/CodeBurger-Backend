import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'

type Setup = (productRepository: LoadProductRepository) => DeleteProduct
type Input = { id: string }
type Output = void
export type DeleteProduct = (input: Input) => Promise<Output>

export const deleteProductUseCase: Setup = productRepository => async ({ id }) => {
  await productRepository.load({ id })
}
