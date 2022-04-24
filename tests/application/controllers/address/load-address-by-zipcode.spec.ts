import { Controller } from '@/application/controllers'
import { LoadAddressByZipCodeController } from '@/application/controllers/address'
import { InvalidFieldError } from '@/application/errors'

import faker from 'faker'

describe('LoadAddressByZipCodeController', () => {
  let sut: LoadAddressByZipCodeController

  let zipCode: string
  let district: string
  let address: string

  const loadAddressByZipCode: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new LoadAddressByZipCodeController(loadAddressByZipCode)

    zipCode = faker.address.zipCode('########')
    district = faker.random.words(2)
    address = faker.address.streetName()

    loadAddressByZipCode.mockResolvedValue({ district, address })
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
    loadAddressByZipCode.mockResolvedValueOnce(undefined)

    const { statusCode, data } = await sut.handle({ zipCode })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new InvalidFieldError('zipCode'))
  })

  it('Should return ok if loadAddressByZipCode return address', async () => {
    const { statusCode, data } = await sut.handle({ zipCode })

    expect(statusCode).toBe(200)
    expect(data).toEqual({ district, address })
  })
})
