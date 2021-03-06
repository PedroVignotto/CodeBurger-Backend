import { categoryParams, productParams } from '@/tests/mocks'
import { AddProductRepository, CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { AddProduct, addProductUseCase } from '@/domain/use-cases/product'
import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { DeleteFile, UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('AddProductUseCase', () => {
  let sut: AddProduct

  const { id: categoryId } = categoryParams
  const { id, name, description, price, available, key, picture, file, error } = productParams

  const productRepository = mock<CheckProductByNameRepository & AddProductRepository>()
  const categoryRepository = mock<CheckCategoryByIdRepository>()
  const uuid = mock<UUIDGenerator>()
  const fileStorage = mock<UploadFile & DeleteFile>()

  beforeAll(() => {
    productRepository.checkByName.mockResolvedValue(false)
    categoryRepository.checkById.mockResolvedValue(true)
    uuid.generate.mockReturnValue(key)
    fileStorage.upload.mockResolvedValue(picture)
    productRepository.create.mockResolvedValue({ id, categoryId, name, description, price, available, picture })
  })

  beforeEach(() => {
    sut = addProductUseCase(productRepository, categoryRepository, uuid, fileStorage)
  })

  it('Should call CheckProductByNameRepository with correct name', async () => {
    await sut({ categoryId, name, description, price, file })

    expect(productRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(productRepository.checkByName).toHaveBeenCalledTimes(1)
  })

  it('Should throw FieldInUseError if CheckProductByNameRepository return true', async () => {
    productRepository.checkByName.mockResolvedValueOnce(true)

    const promise = sut({ categoryId, name, description, price, file })

    await expect(promise).rejects.toThrow(new FieldInUseError('name'))
  })

  it('Should rethrow if CheckProductByNameRepository throws', async () => {
    productRepository.checkByName.mockRejectedValueOnce(error)

    const promise = sut({ categoryId, name, description, price, file })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call CheckCategoryByIdRepository with correct id', async () => {
    await sut({ categoryId, name, description, price, file })

    expect(categoryRepository.checkById).toHaveBeenCalledWith({ id: categoryId })
    expect(categoryRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('Should throw NonExistentFieldError if CheckCategoryByIdRepository return false', async () => {
    categoryRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut({ categoryId, name, description, price, file })

    await expect(promise).rejects.toThrow(new NonExistentFieldError('categoryId'))
  })

  it('Should rethrow if CheckCategoryByIdRepository throws', async () => {
    categoryRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut({ categoryId, name, description, price, file })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call UUIDGenerator', async () => {
    await sut({ categoryId, name, description, price, file })

    expect(uuid.generate).toHaveBeenCalledWith()
    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if UUIDGenerator throws', async () => {
    uuid.generate.mockImplementationOnce(() => { throw error })

    const promise = sut({ categoryId, name, description, price, file })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call UploadFile with correct values', async () => {
    await sut({ categoryId, name, description, price, file })

    expect(fileStorage.upload).toHaveBeenCalledWith({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if UploadFile throws', async () => {
    fileStorage.upload.mockRejectedValueOnce(error)

    const promise = sut({ categoryId, name, description, price, file })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call AddProductRepository with correct values', async () => {
    await sut({ categoryId, name, description, price, file })

    expect(productRepository.create).toHaveBeenCalledWith({ categoryId, name, description, price, picture })
    expect(productRepository.create).toHaveBeenCalledTimes(1)
  })

  it('Should call DeleteFile when file exists and AddProductRepository throws', async () => {
    productRepository.create.mockRejectedValueOnce(error)

    const promise = sut({ categoryId, name, description, price, file })

    promise.catch(() => {
      expect(fileStorage.delete).toHaveBeenCalledWith({ fileName: `${key}.${file.mimeType.split('/')[1]}` })
      expect(fileStorage.delete).toHaveBeenCalledTimes(1)
    })
  })

  it('Should not call DeleteFile when file does not exists and AddProductRepository throws', async () => {
    productRepository.create.mockRejectedValueOnce(error)

    const promise = sut({ categoryId, name, description, price })

    promise.catch(() => {
      expect(fileStorage.delete).not.toHaveBeenCalled()
    })
  })

  it('Should rethrow if AddProductRepository throws', async () => {
    productRepository.create.mockRejectedValueOnce(error)

    const promise = sut({ categoryId, name, description, price, file })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should return product on success', async () => {
    const result = await sut({ categoryId, name, description, price, file })

    expect(result).toEqual({ id, categoryId, name, description, price, available, picture })
  })
})
