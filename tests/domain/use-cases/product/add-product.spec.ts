import { categoryParams, productParams } from '@/tests/mocks'
import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { AddProduct, addProductUseCase } from '@/domain/use-cases/product'
import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('AddProductUseCase', () => {
  let sut: AddProduct

  const { id: categoryId } = categoryParams
  const { name, key, file } = productParams

  const productRepository = mock<CheckProductByNameRepository>()
  const categoryRepository = mock<CheckCategoryByIdRepository>()
  const uuid = mock<UUIDGenerator>()
  const fileStorage = mock<UploadFile>()

  beforeAll(() => {
    productRepository.checkByName.mockResolvedValue(false)
    categoryRepository.checkById.mockResolvedValue(true)
    uuid.generate.mockReturnValue(key)
  })

  beforeEach(() => {
    sut = addProductUseCase(productRepository, categoryRepository, uuid, fileStorage)
  })

  it('Should call CheckProductByNameRepository with correct name', async () => {
    await sut({ categoryId, name, file })

    expect(productRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(productRepository.checkByName).toHaveBeenCalledTimes(1)
  })

  it('Should return FieldInUseError if CheckProductByNameRepository return true', async () => {
    productRepository.checkByName.mockResolvedValueOnce(true)

    const result = await sut({ categoryId, name, file })

    expect(result).toEqual(new FieldInUseError('name'))
  })

  it('Should call CheckCategoryByIdRepository with correct id', async () => {
    await sut({ categoryId, name, file })

    expect(categoryRepository.checkById).toHaveBeenCalledWith({ id: categoryId })
    expect(categoryRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('Should return NonExistentFieldError if CheckCategoryByIdRepository return false', async () => {
    categoryRepository.checkById.mockResolvedValueOnce(false)

    const result = await sut({ categoryId, name, file })

    expect(result).toEqual(new NonExistentFieldError('categoryId'))
  })

  it('Should call UUIDGenerator if file is provided', async () => {
    await sut({ categoryId, name, file })

    expect(uuid.generate).toHaveBeenCalledWith()
    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })

  it('Should call UploadFile with correct values', async () => {
    await sut({ categoryId, name, file })

    expect(fileStorage.upload).toHaveBeenCalledWith({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })
})
