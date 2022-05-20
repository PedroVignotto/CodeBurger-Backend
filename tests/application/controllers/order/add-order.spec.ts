import { accountParams, productParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { RequiredValidation } from '@/application/validation'
import { AddOrderController } from '@/application/controllers/order'
import { NonExistentFieldError } from '@/domain/errors'

describe('AddOrderController', () => {
  let sut: AddOrderController

  const { id: accountId } = accountParams
  const { id: productId } = productParams

  const productsId = [productId]

  const addOrder: jest.Mock = jest.fn()

  beforeAll(() => {
    addOrder.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = new AddOrderController(addOrder)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ accountId, productsId })

    expect(validators).toEqual([
      new RequiredValidation(productsId, 'productsId')
    ])
  })

  it('Should call addOrder with correct values', async () => {
    await sut.handle({ accountId, productsId })

    expect(addOrder).toHaveBeenCalledWith({ accountId, productsId })
    expect(addOrder).toHaveBeenCalledTimes(1)
  })

  it('Should return badRequest if addOrder return NonExistentFieldError', async () => {
    addOrder.mockRejectedValueOnce(new NonExistentFieldError('productsId'))

    const { statusCode, data } = await sut.handle({ accountId, productsId })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new NonExistentFieldError('productsId'))
  })

  it('Should return created if valid data is provided', async () => {
    const { statusCode } = await sut.handle({ accountId, productsId })

    expect(statusCode).toBe(201)
  })
})
