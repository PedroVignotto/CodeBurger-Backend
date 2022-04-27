import { addressParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { DeleteAddressController } from '@/application/controllers/address'
import { InvalidFieldError } from '@/application/errors'

describe('DeleteAddressController', () => {
  let sut: DeleteAddressController

  const { id } = addressParams

  const deleteAddress: jest.Mock = jest.fn()

  beforeAll(() => {
    deleteAddress.mockResolvedValue(true)
  })

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

  it('Should return badRequest if deleteAddress return false', async () => {
    deleteAddress.mockResolvedValueOnce(false)

    const { statusCode, data } = await sut.handle({ id })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new InvalidFieldError('id'))
  })

  it('Should return ok if deleteAddress return true', async () => {
    const { statusCode } = await sut.handle({ id })

    expect(statusCode).toBe(200)
  })
})
