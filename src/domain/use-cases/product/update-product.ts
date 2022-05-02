import { CheckProductByIdRepository, CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { NonExistentFieldError } from '@/domain/errors'

type Setup = (productRepository: CheckProductByIdRepository & CheckProductByNameRepository) => UpdateProduct
type Input = { id: string, name: string }
type Output = undefined | Error
export type UpdateProduct = (input: Input) => Promise<Output>

export const updateProductUseCase: Setup = productRepository => async ({ id, name }) => {
  const productExists = await productRepository.checkById({ id })

  if (!productExists) return new NonExistentFieldError('id')

  await productRepository.checkByName({ name })
}
