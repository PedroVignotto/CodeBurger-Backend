import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { DeleteFile } from '@/domain/contracts/gateways'
import { NonExistentFieldError } from '@/domain/errors'

type Setup = (productRepository: LoadProductRepository, fileStorage: DeleteFile) => DeleteProduct
type Input = { id: string }
type Output = undefined | Error
export type DeleteProduct = (input: Input) => Promise<Output>

export const deleteProductUseCase: Setup = (productRepository, fileStorage) => async ({ id }) => {
  const product = await productRepository.load({ id })

  if (!product) return new NonExistentFieldError('id')

  if (product.picture) await fileStorage.delete({ fileName: product.picture })
}
