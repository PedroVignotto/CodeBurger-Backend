import { orderParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { UpdateOrderController } from '@/application/controllers/order'
import { RequiredValidation } from '@/application/validation'

describe('UpdateOrderController', () => {
  let sut: UpdateOrderController

  const { id, status } = orderParams

  beforeEach(() => {
    sut = new UpdateOrderController()
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ id, status })

    expect(validators).toEqual([new RequiredValidation(status, 'status')])
  })
})
