import { accountParams, categoryParams, orderParams, productParams } from '@/tests/mocks'
import { LoadProductsRepository } from '@/domain/contracts/database/repositories/product'
import { AddOrder, addOrderUseCase } from '@/domain/use-cases/order'

import { mock } from 'jest-mock-extended'
import { NonExistentFieldError } from '@/domain/errors'
import { AddOrderRepository } from '@/domain/contracts/database/repositories/order'

describe('AddOrderUseCase', () => {
  let sut: AddOrder

  const { id: accountId } = accountParams
  const { id: categoryId } = categoryParams
  const { id: productId, name, description, price, available, picture } = productParams
  const { note, total, paymentMode, error } = orderParams

  const productsId = [productId]
  const products = [{ id: productId, categoryId, name, description, price, available, picture }]

  const productRepository = mock<LoadProductsRepository>()
  const orderRepository = mock<AddOrderRepository>()

  beforeAll(() => {
    productRepository.loadAll.mockResolvedValue(products)
  })

  beforeEach(() => {
    sut = addOrderUseCase(productRepository, orderRepository)
  })

  it('Should call LoadProductsRepository with correct values', async () => {
    await sut({ accountId, productsId, note, total, paymentMode })

    expect(productRepository.loadAll).toHaveBeenCalledWith({ productsId })
    expect(productRepository.loadAll).toHaveBeenCalledTimes(1)
  })

  it('Should return NonExistentFieldError if LoadProductsRepository return []', async () => {
    productRepository.loadAll.mockResolvedValueOnce([])

    const result = await sut({ accountId, productsId, note, total, paymentMode })

    expect(result).toEqual(new NonExistentFieldError('productsId'))
  })

  it('Should rethrow if LoadProductsRepository throws', async () => {
    productRepository.loadAll.mockRejectedValueOnce(error)

    const promise = sut({ accountId, productsId, note, total, paymentMode })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call AddOrderRepository with correct values', async () => {
    await sut({ accountId, productsId, note, total, paymentMode })

    expect(orderRepository.create).toHaveBeenCalledWith({ accountId, products, note, total, paymentMode })
    expect(orderRepository.create).toHaveBeenCalledTimes(1)
  })

  it('Should return undefined on success', async () => {
    const result = await sut({ accountId, productsId, note, total, paymentMode })

    expect(result).toBeUndefined()
  })
})
