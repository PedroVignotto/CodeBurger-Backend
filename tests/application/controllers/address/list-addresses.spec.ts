import { Controller } from '@/application/controllers'
import { ListAddressesController } from '@/application/controllers/address'

import faker from 'faker'

describe('ListAddressesController', () => {
  let sut: ListAddressesController

  let id: string
  let accountId: string
  let surname: string
  let zipCode: string
  let district: string
  let address: string
  let number: number
  let complement: string

  const listAddresses: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new ListAddressesController(listAddresses)

    id = faker.datatype.uuid()
    accountId = faker.datatype.uuid()
    surname = faker.random.word()
    zipCode = faker.address.zipCode('########')
    district = faker.random.words(2)
    address = faker.address.streetName()
    number = faker.datatype.number()
    complement = faker.random.words(3)

    listAddresses.mockResolvedValue([{ id, surname, zipCode, district, address, number, complement }])
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should call listAddresses with correct values', async () => {
    await sut.handle({ accountId })

    expect(listAddresses).toHaveBeenCalledWith({ accountId })
    expect(listAddresses).toHaveBeenCalledTimes(1)
  })

  it('Should return ok if valid data is provided', async () => {
    const { statusCode, data } = await sut.handle({ accountId })

    expect(statusCode).toBe(200)
    expect(data).toEqual([{ id, surname, zipCode, district, address, number, complement }])
  })
})
