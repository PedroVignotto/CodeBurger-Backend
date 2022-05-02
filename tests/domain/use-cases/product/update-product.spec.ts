import { categoryParams, productParams } from '@/tests/mocks'
import { CheckProductByIdRepository, CheckProductByNameRepository, LoadProductRepository, UpdateProductRepository } from '@/domain/contracts/database/repositories/product'
import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { UpdateProduct, updateProductUseCase } from '@/domain/use-cases/product'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'
import { DeleteFile, UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'

import { mock } from 'jest-mock-extended'

describe('UpdateProductUseCase', () => {
  let sut: UpdateProduct

  const { id: categoryId } = categoryParams
  const { id, name, description, price, available, key, picture, file, error } = productParams

  const productRepository = mock<CheckProductByIdRepository & CheckProductByNameRepository & LoadProductRepository & UpdateProductRepository>()
  const categoryRepository = mock<CheckCategoryByIdRepository>()
  const fileStorage = mock<UploadFile & DeleteFile>()
  const uuid = mock<UUIDGenerator>()

  beforeAll(() => {
    productRepository.checkById.mockResolvedValue(true)
    productRepository.checkByName.mockResolvedValue(false)
    categoryRepository.checkById.mockResolvedValue(true)
    productRepository.load.mockResolvedValue({ id, categoryId, name, description, price, available, picture })
    uuid.generate.mockReturnValue(key)
    fileStorage.upload.mockResolvedValue(picture)
  })

  beforeEach(() => {
    sut = updateProductUseCase(productRepository, categoryRepository, fileStorage, uuid)
  })

  it('Should call CheckProductByIdRepository with correct id', async () => {
    await sut({ id })

    expect(productRepository.checkById).toHaveBeenCalledWith({ id })
    expect(productRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('Should return NonExistentFieldError if CheckProductByIdRepository return false', async () => {
    productRepository.checkById.mockResolvedValueOnce(false)

    const result = await sut({ id })

    expect(result).toEqual(new NonExistentFieldError('id'))
  })

  it('Should rethrow if CheckProductByIdRepository throws', async () => {
    productRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call CheckProductByNameRepository with correct name', async () => {
    await sut({ id, name })

    expect(productRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(productRepository.checkByName).toHaveBeenCalledTimes(1)
  })

  it('Should return FieldInUseError if CheckProductByNameRepository return true', async () => {
    productRepository.checkByName.mockResolvedValueOnce(true)

    const result = await sut({ id, name })

    expect(result).toEqual(new FieldInUseError('name'))
  })

  it('Should rethrow if CheckProductByNameRepository throws', async () => {
    productRepository.checkByName.mockRejectedValueOnce(error)

    const promise = sut({ id, name })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call CheckCategoryByIdRepository with correct id', async () => {
    await sut({ id, name, categoryId })

    expect(categoryRepository.checkById).toHaveBeenCalledWith({ id: categoryId })
    expect(categoryRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('Should return NonExistentFieldError if CheckCategoryByIdRepository return false', async () => {
    categoryRepository.checkById.mockResolvedValueOnce(false)

    const result = await sut({ id, name, categoryId })

    expect(result).toEqual(new NonExistentFieldError('categoryId'))
  })

  it('Should rethrow if CheckCategoryByIdRepository throws', async () => {
    categoryRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut({ id, name, categoryId })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call UUIDGenerator', async () => {
    await sut({ id, name, categoryId, file })

    expect(uuid.generate).toHaveBeenCalledWith()
    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if UUIDGenerator throws', async () => {
    uuid.generate.mockImplementationOnce(() => { throw error })

    const promise = sut({ id, name, categoryId, file })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call LoadProductRepository with correct id', async () => {
    await sut({ id, name, categoryId, file })

    expect(productRepository.load).toHaveBeenCalledWith({ id })
    expect(productRepository.load).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if LoadProductRepository throws', async () => {
    productRepository.load.mockRejectedValueOnce(error)

    const promise = sut({ id, name, categoryId, file })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call DeleteFile if product already picture', async () => {
    await sut({ id, name, categoryId, file })

    expect(fileStorage.delete).toHaveBeenCalledWith({ fileName: picture })
    expect(fileStorage.delete).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if DeleteFile throws', async () => {
    fileStorage.delete.mockRejectedValueOnce(error)

    const promise = sut({ id, name, categoryId, file })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call UploadFile with correct values', async () => {
    await sut({ id, name, categoryId, file })

    expect(fileStorage.upload).toHaveBeenCalledWith({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if UploadFile throws', async () => {
    fileStorage.upload.mockRejectedValueOnce(error)

    const promise = sut({ id, name, categoryId, file })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call UpdateProductRepository with correct values', async () => {
    await sut({ id, name, description, price, available, categoryId, file })

    expect(productRepository.update).toHaveBeenCalledWith({ id, categoryId, name, description, price, available, picture })
    expect(productRepository.update).toHaveBeenCalledTimes(1)
  })

  it('Should call DeleteFile when file exists and UpdateProductRepository throws', async () => {
    productRepository.update.mockRejectedValueOnce(error)

    const promise = sut({ id, name, description, price, available, categoryId, file })

    promise.catch(() => {
      expect(fileStorage.delete).toHaveBeenCalledWith({ fileName: key })
      expect(fileStorage.delete).toHaveBeenCalledTimes(2)
    })
  })

  it('Should not call DeleteFile when file does not exists and UpdateProductRepository throws', async () => {
    productRepository.update.mockRejectedValueOnce(error)

    const promise = sut({ id, name, description, price, available, categoryId })

    promise.catch(() => {
      expect(fileStorage.delete).not.toHaveBeenCalled()
    })
  })

  it('Should rethrow if UpdateProductRepository throws', async () => {
    productRepository.update.mockRejectedValueOnce(error)

    const promise = sut({ id, name, description, price, available, categoryId })

    await expect(promise).rejects.toThrow(error)
  })
})
