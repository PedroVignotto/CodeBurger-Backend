import { accountParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { ListOrderController } from '@/application/controllers/order'

describe('ListOrderController', () => {
  let sut: ListOrderController

  const { id: accountId } = accountParams

  const listOrder: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new ListOrderController(listOrder)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should call listOrder with correct values', async () => {
    await sut.handle({ accountId })

    expect(listOrder).toHaveBeenCalledWith({ accountId })
    expect(listOrder).toHaveBeenCalledTimes(1)
  })
})
