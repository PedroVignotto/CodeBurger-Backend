import { categoryParams, productParams } from '@/tests/mocks'
import { CheckProductByIdRepository, CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { UpdateProduct, updateProductUseCase } from '@/domain/use-cases/product'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('UpdateProductUseCase', () => {
  let sut: UpdateProduct

  const { id: categoryId } = categoryParams
  const { id, name, error } = productParams

  const productRepository = mock<CheckProductByIdRepository & CheckProductByNameRepository>()
  const categoryRepository = mock<CheckCategoryByIdRepository>()

  beforeAll(() => {
    productRepository.checkById.mockResolvedValue(true)
    productRepository.checkByName.mockResolvedValue(false)
  })

  beforeEach(() => {
    sut = updateProductUseCase(productRepository, categoryRepository)
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
})
