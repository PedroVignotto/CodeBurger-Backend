import { Controller } from '@/application/controllers'
import { LoadAddressByZipCodeController } from '@/application/controllers/address'
import { InvalidFieldError } from '@/application/errors'

import faker from 'faker'

describe('LoadAddressByZipCodeController', () => {
  let sut: LoadAddressByZipCodeController

  let zipCode: string

  const loadAddressByZipCode: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new LoadAddressByZipCodeController(loadAddressByZipCode)

    zipCode = faker.address.zipCode('########')
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
    const { statusCode, data } = await sut.handle({ zipCode })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new InvalidFieldError('zipCode'))
  })
})
