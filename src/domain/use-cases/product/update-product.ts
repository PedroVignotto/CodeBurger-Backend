import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { CheckProductByIdRepository, CheckProductByNameRepository, LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { DeleteFile, UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'

type Setup = (
  productRepository: CheckProductByIdRepository & CheckProductByNameRepository & LoadProductRepository,
  categoryRepository: CheckCategoryByIdRepository,
  fileStorage: UploadFile & DeleteFile,
  uuid: UUIDGenerator,
) => UpdateProduct
type Input = { id: string, name?: string, categoryId?: string, file?: { buffer: Buffer, mimeType: string } }
type Output = undefined | Error
export type UpdateProduct = (input: Input) => Promise<Output>

export const updateProductUseCase: Setup = (productRepository, categoryRepository, fileStorage, uuid) => async ({ id, name, categoryId, file }) => {
  const productNotExists = await productRepository.checkById({ id })

  if (!productNotExists) return new NonExistentFieldError('id')

  if (name) {
    const productExists = await productRepository.checkByName({ name })

    if (productExists) return new FieldInUseError('name')
  }

  if (categoryId) {
    const categoryExists = await categoryRepository.checkById({ id: categoryId })

    if (!categoryExists) return new NonExistentFieldError('categoryId')
  }

  if (file) {
    const { picture } = await productRepository.load({ id })

    if (picture) await fileStorage.delete({ fileName: picture })

    const key = uuid.generate()

    await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
  }
}
