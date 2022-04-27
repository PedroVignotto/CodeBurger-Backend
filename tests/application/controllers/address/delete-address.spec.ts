import { addressParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { DeleteAddressController } from '@/application/controllers/address'

describe('DeleteAddressController', () => {
  let sut: DeleteAddressController

  const { id } = addressParams

  const deleteAddress: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new DeleteAddressController(deleteAddress)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should call deleteAddress with correct values', async () => {
    await sut.handle({ id })

    expect(deleteAddress).toHaveBeenCalledWith({ id })
    expect(deleteAddress).toHaveBeenCalledTimes(1)
  })
})
