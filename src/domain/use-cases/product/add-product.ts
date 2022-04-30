import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'

type Setup = (productRepository: CheckProductByNameRepository) => AddProduct
type Input = { name: string }
type Output = void
export type AddProduct = (input: Input) => Promise<Output>

export const addProductUseCase: Setup = productRepository => async ({ name }) => {
  await productRepository.checkByName({ name })
}
