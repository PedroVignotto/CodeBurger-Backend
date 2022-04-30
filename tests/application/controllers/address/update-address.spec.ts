import { addressParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { UpdateAddressController } from '@/application/controllers/address'
import { NonExistentFieldError } from '@/domain/errors'

describe('UpdateAddressController', () => {
  let sut: UpdateAddressController

  const { id, surname, number, complement } = addressParams

  const updateAddress: jest.Mock = jest.fn()

  beforeAll(() => {
    updateAddress.mockResolvedValue(undefined)
  })

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

  it('Should return badRequest if updateAddress return NonExistentFieldError', async () => {
    updateAddress.mockResolvedValueOnce(new NonExistentFieldError('id'))

    const { statusCode, data } = await sut.handle({ id, surname, number, complement })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new NonExistentFieldError('id'))
  })

  it('Should return noContent if valid data is provided', async () => {
    const { statusCode } = await sut.handle({ id, surname, number, complement })

    expect(statusCode).toBe(204)
  })
})
