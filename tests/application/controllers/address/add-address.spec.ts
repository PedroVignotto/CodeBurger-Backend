import { Controller } from '@/application/controllers'
import { AddAddressController } from '@/application/controllers/address'
import { InvalidFieldError } from '@/application/errors'
import { RequiredValidation } from '@/application/validation'

import faker from 'faker'

describe('AddAddressController', () => {
  let sut: AddAddressController

  let accountId: string
  let surname: string
  let zipCode: string
  let district: string
  let address: string
  let number: number
  let complement: string

  const addAddress: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new AddAddressController(addAddress)

    accountId = faker.datatype.uuid()
    surname = faker.random.word()
    zipCode = faker.address.zipCode('########')
    district = faker.random.words(2)
    address = faker.address.streetName()
    number = faker.datatype.number()
    complement = faker.random.words(3)

    addAddress.mockResolvedValue({ accountId, surname, zipCode, district, address, number, complement })
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ accountId, surname, zipCode, district, address, number })

    expect(validators).toEqual([
      new RequiredValidation(surname, 'surname'),
      new RequiredValidation(zipCode, 'zipCode'),
      new RequiredValidation(district, 'district'),
      new RequiredValidation(address, 'address'),
      new RequiredValidation(number, 'number')
    ])
  })

  it('Should call addAddress with correct values', async () => {
    await sut.handle({ accountId, surname, zipCode, district, address, number, complement })

    expect(addAddress).toHaveBeenCalledWith({ accountId, surname, zipCode, district, address, number, complement })
    expect(addAddress).toHaveBeenCalledTimes(1)
  })

  it('Should return badRequest if addAddress return false', async () => {
    addAddress.mockResolvedValueOnce(false)

    const { statusCode, data } = await sut.handle({ accountId, surname, zipCode, district, address, number, complement })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new InvalidFieldError('zipCode'))
  })

  it('Should return created if valid data is provided', async () => {
    const { statusCode, data } = await sut.handle({ accountId, surname, zipCode, district, address, number, complement })

    expect(statusCode).toBe(201)
    expect(data).toBeUndefined()
  })
})
