import { orderParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { UpdateOrderController } from '@/application/controllers/order'
import { RequiredValidation } from '@/application/validation'
import { NonExistentFieldError } from '@/domain/errors'

describe('UpdateOrderController', () => {
  let sut: UpdateOrderController

  const { id, status } = orderParams

  const updateOrder: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new UpdateOrderController(updateOrder)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ id, status })

    expect(validators).toEqual([new RequiredValidation(status, 'status')])
  })

  it('Should call updateOrder with correct values', async () => {
    await sut.handle({ id, status })

    expect(updateOrder).toHaveBeenCalledWith({ id, status })
    expect(updateOrder).toHaveBeenCalledTimes(1)
  })

  it('Should return badRequest if updateOrder return NonExistentFieldError', async () => {
    updateOrder.mockResolvedValueOnce(new NonExistentFieldError('id'))

    const { statusCode, data } = await sut.handle({ id, status })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new NonExistentFieldError('id'))
  })
})
