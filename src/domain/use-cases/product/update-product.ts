import { CheckProductByIdRepository } from '@/domain/contracts/database/repositories/product'

type Setup = (productRepository: CheckProductByIdRepository) => UpdateProduct
type Input = { id: string }
type Output = void
export type UpdateProduct = (input: Input) => Promise<Output>

export const updateProductUseCase: Setup = productRepository => async ({ id }) => {
  await productRepository.checkById({ id })
}
