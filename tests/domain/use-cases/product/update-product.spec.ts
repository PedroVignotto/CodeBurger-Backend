import { productParams } from '@/tests/mocks'
import { CheckProductByIdRepository } from '@/domain/contracts/database/repositories/product'
import { UpdateProduct, updateProductUseCase } from '@/domain/use-cases/product'

import { mock } from 'jest-mock-extended'

describe('UpdateProductUseCase', () => {
  let sut: UpdateProduct

  const { id } = productParams

  const productRepository = mock<CheckProductByIdRepository>()

  beforeEach(() => {
    sut = updateProductUseCase(productRepository)
  })

  it('Should call CheckProductByIdRepository with correct id', async () => {
    await sut({ id })

    expect(productRepository.checkById).toHaveBeenCalledWith({ id })
    expect(productRepository.checkById).toHaveBeenCalledTimes(1)
  })
})
