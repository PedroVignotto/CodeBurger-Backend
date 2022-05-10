import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { CheckProductByIdRepository, CheckProductByNameRepository, LoadProductRepository, UpdateProductRepository } from '@/domain/contracts/database/repositories/product'
import { DeleteFile, UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'

type Setup = (
  productRepository: CheckProductByIdRepository & CheckProductByNameRepository & LoadProductRepository & UpdateProductRepository,
  categoryRepository: CheckCategoryByIdRepository,
  fileStorage: UploadFile & DeleteFile,
  uuid: UUIDGenerator,
) => UpdateProduct
type Input = {
  id: string
  name?: string
  categoryId?: string
  description?: string
  price?: number
  available?: boolean
  file?: { buffer: Buffer, mimeType: string }
}
type Output = void
export type UpdateProduct = (input: Input) => Promise<Output>

export const updateProductUseCase: Setup = (productRepository, categoryRepository, fileStorage, uuid) => async ({ id, name, categoryId, file, description, price, available }) => {
  const productNotExists = await productRepository.checkById({ id })

  if (!productNotExists) throw new NonExistentFieldError('id')

  if (name) {
    const productExists = await productRepository.checkByName({ name })

    if (productExists) throw new FieldInUseError('name')
  }

  if (categoryId) {
    const categoryExists = await categoryRepository.checkById({ id: categoryId })

    if (!categoryExists) throw new NonExistentFieldError('categoryId')
  }

  let picture: string | undefined

  const key = uuid.generate()

  if (file) {
    const product = await productRepository.load({ id })

    if (product?.picture) await fileStorage.delete({ fileName: product?.picture })

    picture = await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
  }

  try {
    await productRepository.update({ id, categoryId, name, picture, description, price, available: available?.toString() === 'true' })
  } catch (error) {
    if (file) await fileStorage.delete({ fileName: `${key}.${file.mimeType.split('/')[1]}` })

    throw error
  }
}
