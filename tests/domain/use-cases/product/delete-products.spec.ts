import { productParams } from '@/tests/mocks'
import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { DeleteProduct, deleteProductUseCase } from '@/domain/use-cases/product'

import { mock } from 'jest-mock-extended'

describe('DeleteProductUseCase', () => {
  let sut: DeleteProduct

  const { id } = productParams

  const productRepository = mock<LoadProductRepository>()

  beforeEach(() => {
    sut = deleteProductUseCase(productRepository)
  })

  it('Should call LoadProductRepository with correct id', async () => {
    await sut({ id })

    expect(productRepository.load).toHaveBeenCalledWith({ id })
    expect(productRepository.load).toHaveBeenCalledTimes(1)
  })
})
