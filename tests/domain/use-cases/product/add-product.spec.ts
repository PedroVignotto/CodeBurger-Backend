import { categoryParams } from '@/tests/mocks'
import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { AddProduct, addProductUseCase } from '@/domain/use-cases/product'

import { mock } from 'jest-mock-extended'

describe('AddProductUseCase', () => {
  let sut: AddProduct

  const { name } = categoryParams

  const productRepository = mock<CheckProductByNameRepository>()

  beforeEach(() => {
    sut = addProductUseCase(productRepository)
  })

  it('Should call CheckProductByNameRepository with correct name', async () => {
    await sut({ name })

    expect(productRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(productRepository.checkByName).toHaveBeenCalledTimes(1)
  })
})
