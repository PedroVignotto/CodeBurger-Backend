import { addressParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { AddAddressController } from '@/application/controllers/address'
import { RequiredValidation } from '@/application/validation'
import { FieldNotFoundError } from '@/domain/errors'

describe('AddAddressController', () => {
  let sut: AddAddressController

  const { accountId, surname, zipCode, district, street, number, complement } = addressParams

  const addAddress: jest.Mock = jest.fn()

  beforeAll(() => {
    addAddress.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = new AddAddressController(addAddress)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ accountId, surname, zipCode, district, street, number })

    expect(validators).toEqual([
      new RequiredValidation(surname, 'surname'),
      new RequiredValidation(zipCode, 'zipCode'),
      new RequiredValidation(district, 'district'),
      new RequiredValidation(street, 'street'),
      new RequiredValidation(number, 'number')
    ])
  })

  it('Should call addAddress with correct values', async () => {
    await sut.handle({ accountId, surname, zipCode, district, street, number, complement })

    expect(addAddress).toHaveBeenCalledWith({ accountId, surname, zipCode, district, street, number, complement })
    expect(addAddress).toHaveBeenCalledTimes(1)
  })

  it('Should return badRequest if addAddress return FieldNotFoundError', async () => {
    addAddress.mockResolvedValueOnce(new FieldNotFoundError('zipCode'))

    const { statusCode, data } = await sut.handle({ accountId, surname, zipCode, district, street, number, complement })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldNotFoundError('zipCode'))
  })

  it('Should return created if valid data is provided', async () => {
    const { statusCode, data } = await sut.handle({ accountId, surname, zipCode, district, street, number, complement })

    expect(statusCode).toBe(201)
    expect(data).toBeUndefined()
  })
})
