import { addressParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { UpdateAddressController } from '@/application/controllers/address'

describe('UpdateAddressController', () => {
  let sut: UpdateAddressController

  const { id, surname, number, complement } = addressParams

  const updateAddress: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new UpdateAddressController(updateAddress)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should call updateAddress with correct values', async () => {
    await sut.handle({ id, surname, number, complement })

    expect(updateAddress).toHaveBeenCalledWith({ id, surname, number, complement })
    expect(updateAddress).toHaveBeenCalledTimes(1)
  })

  it('Should return noContent if valid data is provided', async () => {
    const { statusCode } = await sut.handle({ id, surname, number, complement })

    expect(statusCode).toBe(204)
  })
})
