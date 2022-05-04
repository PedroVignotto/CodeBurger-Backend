import { accountParams, orderParams, productParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { RequiredValidation } from '@/application/validation'
import { AddOrderController } from '@/application/controllers/order'

describe('AddOrderController', () => {
  let sut: AddOrderController

  const { id: accountId } = accountParams
  const { id: productId } = productParams
  const { total, paymentMode } = orderParams

  const productsId = [productId]

  beforeEach(() => {
    sut = new AddOrderController()
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
})
