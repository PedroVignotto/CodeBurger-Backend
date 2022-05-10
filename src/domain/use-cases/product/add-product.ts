import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { AddProductRepository, CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { DeleteFile, UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'

type Setup = (
  productRepository: CheckProductByNameRepository & AddProductRepository,
  categoryRepository: CheckCategoryByIdRepository,
  uuid: UUIDGenerator,
  fileStorage: UploadFile & DeleteFile,
) => AddProduct
type Input = { categoryId: string, name: string, description: string, price: number, file?: { buffer: Buffer, mimeType: string } }
type Output = { id: string, categoryId: string, name: string, description: string, price: number, available: boolean, picture?: string }
export type AddProduct = (input: Input) => Promise<Output>

export const addProductUseCase: Setup = (productRepository, categoryRepository, uuid, fileStorage) => async ({ categoryId, name, description, price, file }) => {
  const productExists = await productRepository.checkByName({ name })

  if (productExists) throw new FieldInUseError('name')

  const categoryExists = await categoryRepository.checkById({ id: categoryId })

  if (!categoryExists) throw new NonExistentFieldError('categoryId')

  const key = uuid.generate()

  let picture: string | undefined

  if (file) picture = await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })

  try {
    return await productRepository.create({ categoryId, name, description, price, picture })
  } catch (error) {
    if (file) await fileStorage.delete({ fileName: `${key}.${file.mimeType.split('/')[1]}` })

    throw error
  }
}
