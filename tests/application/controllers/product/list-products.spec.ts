import { categoryParams, productParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { ListProductsController } from '@/application/controllers/product'

describe('ListProductsController', () => {
  let sut: ListProductsController

  const { id: categoryId } = categoryParams
  const { id, name, description, price, available, picture } = productParams

  const listProducts: jest.Mock = jest.fn()

  beforeAll(() => {
    listProducts.mockResolvedValue([{ id, categoryId, name, description, price, available, picture }])
  })

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

  it('Should return ok if valid data is provided', async () => {
    const { statusCode, data } = await sut.handle({ categoryId })

    expect(statusCode).toBe(200)
    expect(data).toEqual([{ id, categoryId, name, description, price, available, picture }])
  })
})
