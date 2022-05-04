import { categoryParams, productParams } from '@/tests/mocks'
import { LoadProductsRepository } from '@/domain/contracts/database/repositories/product'
import { AddOrder, addOrderUseCase } from '@/domain/use-cases/order'

import { mock } from 'jest-mock-extended'
import { NonExistentFieldError } from '@/domain/errors'

describe('AddOrderUseCase', () => {
  let sut: AddOrder

  const { id: categoryId } = categoryParams
  const { id: productId, name, description, price, available, picture } = productParams

  const productRepository = mock<LoadProductsRepository>()

  beforeAll(() => {
    productRepository.loadAll.mockResolvedValue([{ id: productId, categoryId, name, description, price, available, picture }])
  })

  beforeEach(() => {
    sut = addOrderUseCase(productRepository)
  })

  it('Should call LoadProductsRepository with correct values', async () => {
    await sut({ productsId: [productId] })

    expect(productRepository.loadAll).toHaveBeenCalledWith({ productsId: [productId] })
    expect(productRepository.loadAll).toHaveBeenCalledTimes(1)
  })

  it('Should return NonExistentFieldError if LoadProductsRepository return []', async () => {
    productRepository.loadAll.mockResolvedValueOnce([])

    const result = await sut({ productsId: [productId] })

    expect(result).toEqual(new NonExistentFieldError('productsId'))
  })
})
