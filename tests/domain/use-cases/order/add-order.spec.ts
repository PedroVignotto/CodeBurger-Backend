import { productParams } from '@/tests/mocks'
import { LoadProductsRepository } from '@/domain/contracts/database/repositories/product'
import { AddOrder, addOrderUseCase } from '@/domain/use-cases/order'

import { mock } from 'jest-mock-extended'

describe('AddOrderUseCase', () => {
  let sut: AddOrder

  const { id: productId } = productParams

  const productRepository = mock<LoadProductsRepository>()

  beforeEach(() => {
    sut = addOrderUseCase(productRepository)
  })

  it('Should call LoadProductsRepository with correct values', async () => {
    await sut({ productsId: [productId] })

    expect(productRepository.loadAll).toHaveBeenCalledWith({ productsId: [productId] })
    expect(productRepository.loadAll).toHaveBeenCalledTimes(1)
  })
})
