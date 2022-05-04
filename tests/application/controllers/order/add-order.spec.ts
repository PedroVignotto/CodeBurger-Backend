import { accountParams, orderParams, productParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { RequiredValidation } from '@/application/validation'
import { AddOrderController } from '@/application/controllers/order'
import { NonExistentFieldError } from '@/domain/errors'

describe('AddOrderController', () => {
  let sut: AddOrderController

  const { id: accountId } = accountParams
  const { id: productId } = productParams
  const { note, total, paymentMode } = orderParams

  const productsId = [productId]

  const addOrder: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new AddOrderController(addOrder)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ accountId, productsId, total, paymentMode })

    expect(validators).toEqual([
      new RequiredValidation(accountId, 'accountId'),
      new RequiredValidation(productsId, 'productsId'),
      new RequiredValidation(total, 'total'),
      new RequiredValidation(paymentMode, 'paymentMode')
    ])
  })

  it('Should call addOrder with correct values', async () => {
    await sut.handle({ accountId, productsId, note, total, paymentMode })

    expect(addOrder).toHaveBeenCalledWith({ accountId, productsId, note, total, paymentMode })
    expect(addOrder).toHaveBeenCalledTimes(1)
  })

  it('Should return badRequest if addOrder return NonExistentFieldError', async () => {
    addOrder.mockResolvedValueOnce(new NonExistentFieldError('productsId'))

    const { statusCode, data } = await sut.handle({ accountId, productsId, note, total, paymentMode })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new NonExistentFieldError('productsId'))
  })
})
