import { productParams } from '@/tests/mocks'
import { CheckProductByIdRepository, CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { UpdateProduct, updateProductUseCase } from '@/domain/use-cases/product'
import { NonExistentFieldError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('UpdateProductUseCase', () => {
  let sut: UpdateProduct

  const { id, name, error } = productParams

  const productRepository = mock<CheckProductByIdRepository & CheckProductByNameRepository>()

  beforeAll(() => {
    productRepository.checkById.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = updateProductUseCase(productRepository)
  })

  it('Should call CheckProductByIdRepository with correct id', async () => {
    await sut({ id, name })

    expect(productRepository.checkById).toHaveBeenCalledWith({ id })
    expect(productRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('Should return NonExistentFieldError if CheckProductByIdRepository return false', async () => {
    productRepository.checkById.mockResolvedValueOnce(false)

    const result = await sut({ id, name })

    expect(result).toEqual(new NonExistentFieldError('id'))
  })

  it('Should rethrow if CheckProductByIdRepository throws', async () => {
    productRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut({ id, name })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call CheckProductByNameRepository with correct name', async () => {
    await sut({ id, name })

    expect(productRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(productRepository.checkByName).toHaveBeenCalledTimes(1)
  })
})
