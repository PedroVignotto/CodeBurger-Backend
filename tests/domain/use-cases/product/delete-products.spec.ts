import { categoryParams, productParams } from '@/tests/mocks'
import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { DeleteProduct, deleteProductUseCase } from '@/domain/use-cases/product'
import { DeleteFile } from '@/domain/contracts/gateways'
import { NonExistentFieldError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('DeleteProductUseCase', () => {
  let sut: DeleteProduct

  const { id: categoryId } = categoryParams
  const { id, name, description, price, available, error, picture } = productParams

  const productRepository = mock<LoadProductRepository>()
  const fileStorage = mock<DeleteFile>()

  beforeAll(() => {
    productRepository.load.mockResolvedValue({ id, categoryId, name, description, price, available, picture })
  })

  beforeEach(() => {
    sut = deleteProductUseCase(productRepository, fileStorage)
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

  it('Should call DeleteFile if product has image', async () => {
    await sut({ id })

    expect(fileStorage.delete).toHaveBeenCalledWith({ fileName: picture })
    expect(fileStorage.delete).toHaveBeenCalledTimes(1)
  })

  it('Should not call DeleteFile if product not have image', async () => {
    productRepository.load.mockResolvedValueOnce({ id, categoryId, name, description, price, available })

    await sut({ id })

    expect(fileStorage.delete).not.toHaveBeenCalled()
  })

  it('Should rethrow if DeleteFile throws', async () => {
    fileStorage.delete.mockRejectedValueOnce(error)

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(error)
  })
})
