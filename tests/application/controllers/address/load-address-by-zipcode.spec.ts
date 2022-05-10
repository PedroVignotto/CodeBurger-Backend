import { addressParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { LoadAddressByZipCodeController } from '@/application/controllers/address'
import { FieldNotFoundError } from '@/domain/errors'

describe('LoadAddressByZipCodeController', () => {
  let sut: LoadAddressByZipCodeController

  const { zipCode, district, street } = addressParams

  const loadAddressByZipCode: jest.Mock = jest.fn()

  beforeAll(() => {
    loadAddressByZipCode.mockResolvedValue({ district, street })
  })

  beforeEach(() => {
    sut = new LoadAddressByZipCodeController(loadAddressByZipCode)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should call loadAddressByZipCode with correct values', async () => {
    await sut.handle({ zipCode })

    expect(loadAddressByZipCode).toHaveBeenCalledWith({ zipCode })
    expect(loadAddressByZipCode).toHaveBeenCalledTimes(1)
  })

  it('Should return badRequest if loadAddressByZipCode return undefined', async () => {
    loadAddressByZipCode.mockRejectedValueOnce(new FieldNotFoundError('zipCode'))

    const { statusCode, data } = await sut.handle({ zipCode })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldNotFoundError('zipCode'))
  })

  it('Should return ok if loadAddressByZipCode return address', async () => {
    const { statusCode, data } = await sut.handle({ zipCode })

    expect(statusCode).toBe(200)
    expect(data).toEqual({ district, street })
  })
})
