import { accountParams, orderParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { ListOrdersController } from '@/application/controllers/order'

describe('ListOrdersController', () => {
  let sut: ListOrdersController

  const { id: accountId } = accountParams
  const { id, note, total, paymentMode, status, createdAt, updatedAt } = orderParams

  const listOrder: jest.Mock = jest.fn()

  beforeAll(() => {
    listOrder.mockResolvedValue([{ id, note, total, paymentMode, status, createdAt, updatedAt }])
  })

  beforeEach(() => {
    sut = new ListOrdersController(listOrder)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should call listOrder with correct values', async () => {
    await sut.handle({ accountId })

    expect(listOrder).toHaveBeenCalledWith({ accountId })
    expect(listOrder).toHaveBeenCalledTimes(1)
  })

  it('Should return ok if valid data is provided', async () => {
    const { statusCode, data } = await sut.handle({ accountId })

    expect(statusCode).toBe(200)
    expect(data).toEqual([{ id, note, total, paymentMode, status, createdAt, updatedAt }])
  })
})
