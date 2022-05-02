import { productParams } from '@/tests/mocks'
import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { DeleteProduct, deleteProductUseCase } from '@/domain/use-cases/product'
import { NonExistentFieldError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('DeleteProductUseCase', () => {
  let sut: DeleteProduct

  const { id, error } = productParams

  const productRepository = mock<LoadProductRepository>()

  beforeEach(() => {
    sut = deleteProductUseCase(productRepository)
  })

  it('Should call LoadProductRepository with correct id', async () => {
    await sut({ id })

    expect(productRepository.load).toHaveBeenCalledWith({ id })
    expect(productRepository.load).toHaveBeenCalledTimes(1)
  })

  it('Should return NonExistentFieldError if LoadProductRepository return undefined', async () => {
    productRepository.load.mockResolvedValueOnce(undefined)

    const result = await sut({ id })

    expect(result).toEqual(new NonExistentFieldError('id'))
  })

  it('Should rethrow if LoadProductRepository throws', async () => {
    productRepository.load.mockRejectedValueOnce(error)

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(error)
  })
})
