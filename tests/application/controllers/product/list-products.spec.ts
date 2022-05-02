import { categoryParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { ListProductsController } from '@/application/controllers/product'

describe('ListProductsController', () => {
  let sut: ListProductsController

  const { id: categoryId } = categoryParams

  const listProducts: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new ListProductsController(listProducts)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should call listProducts with correct values', async () => {
    await sut.handle({ categoryId })

    expect(listProducts).toHaveBeenCalledWith({ categoryId })
    expect(listProducts).toHaveBeenCalledTimes(1)
  })
})
