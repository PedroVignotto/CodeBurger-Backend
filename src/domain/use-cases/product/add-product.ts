import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { FieldInUseError } from '@/domain/errors'

type Setup = (productRepository: CheckProductByNameRepository) => AddProduct
type Input = { name: string }
type Output = Error
export type AddProduct = (input: Input) => Promise<Output>

export const addProductUseCase: Setup = productRepository => async ({ name }) => {
  await productRepository.checkByName({ name })

  return new FieldInUseError('name')
}
