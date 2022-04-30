import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { AddProductRepository, CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'

type Setup = (
  productRepository: CheckProductByNameRepository & AddProductRepository,
  categoryRepository: CheckCategoryByIdRepository,
  uuid: UUIDGenerator,
  fileStorage: UploadFile,
) => AddProduct
type Input = { categoryId: string, name: string, description: string, price: number, file?: { buffer: Buffer, mimeType: string } }
type Output = undefined | Error
export type AddProduct = (input: Input) => Promise<Output>

export const addProductUseCase: Setup = (productRepository, categoryRepository, uuid, fileStorage) => async ({ categoryId, name, description, price, file }) => {
  const productExists = await productRepository.checkByName({ name })

  if (productExists) return new FieldInUseError('name')

  const categoryExists = await categoryRepository.checkById({ id: categoryId })

  if (!categoryExists) return new NonExistentFieldError('categoryId')

  const key = uuid.generate()

  let picture: string | undefined

  if (file) picture = await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })

  await productRepository.create({ categoryId, name, description, price, picture })
}
