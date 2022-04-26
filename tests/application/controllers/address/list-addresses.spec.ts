import { Controller } from '@/application/controllers'
import { ListAddressController } from '@/application/controllers/address'

import faker from 'faker'

describe('ListAddressController', () => {
  let sut: ListAddressController

  let id: string
  let accountId: string
  let surname: string
  let zipCode: string
  let district: string
  let address: string
  let number: number
  let complement: string

  const listAddress: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new ListAddressController(listAddress)

    id = faker.datatype.uuid()
    accountId = faker.datatype.uuid()
    surname = faker.random.word()
    zipCode = faker.address.zipCode('########')
    district = faker.random.words(2)
    address = faker.address.streetName()
    number = faker.datatype.number()
    complement = faker.random.words(3)

    listAddress.mockResolvedValue([{ id, surname, zipCode, district, address, number, complement }])
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should call listAddress with correct values', async () => {
    await sut.handle({ accountId })

    expect(listAddress).toHaveBeenCalledWith({ accountId })
    expect(listAddress).toHaveBeenCalledTimes(1)
  })

  it('Should return ok if valid data is provided', async () => {
    const { statusCode, data } = await sut.handle({ accountId })

    expect(statusCode).toBe(200)
    expect(data).toEqual([{ id, surname, zipCode, district, address, number, complement }])
  })
})
