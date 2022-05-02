import { categoryParams, productParams } from '@/tests/mocks'
import { CheckProductByIdRepository, CheckProductByNameRepository, LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { UpdateProduct, updateProductUseCase } from '@/domain/use-cases/product'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'
import { DeleteFile, UUIDGenerator } from '@/domain/contracts/gateways'

import { mock } from 'jest-mock-extended'

describe('UpdateProductUseCase', () => {
  let sut: UpdateProduct

  const { id: categoryId } = categoryParams
  const { id, name, description, price, available, picture, file, error } = productParams

  const productRepository = mock<CheckProductByIdRepository & CheckProductByNameRepository & LoadProductRepository>()
  const categoryRepository = mock<CheckCategoryByIdRepository>()
  const fileStorage = mock<DeleteFile>()
  const uuid = mock<UUIDGenerator>()

  beforeAll(() => {
    productRepository.checkById.mockResolvedValue(true)
    productRepository.checkByName.mockResolvedValue(false)
    categoryRepository.checkById.mockResolvedValue(true)
    productRepository.load.mockResolvedValue({ id, categoryId, name, description, price, available, picture })
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

  it('Should call LoadProductRepository with correct id', async () => {
    await sut({ id, name, categoryId, file })

    expect(productRepository.load).toHaveBeenCalledWith({ id })
    expect(productRepository.load).toHaveBeenCalledTimes(1)
  })

  it('Should call DeleteFile if product already picture', async () => {
    await sut({ id, name, categoryId, file })

    expect(fileStorage.delete).toHaveBeenCalledWith({ fileName: picture })
    expect(fileStorage.delete).toHaveBeenCalledTimes(1)
  })

  it('Should call UUIDGenerator', async () => {
    await sut({ id, name, categoryId, file })

    expect(uuid.generate).toHaveBeenCalledWith()
    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })
})
