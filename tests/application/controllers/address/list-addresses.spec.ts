import { addressParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { ListAddressesController } from '@/application/controllers/address'

describe('ListAddressesController', () => {
  let sut: ListAddressesController

  const { id, accountId, surname, zipCode, district, street, number, complement } = addressParams

  const listAddresses: jest.Mock = jest.fn()

  beforeAll(() => {
    listAddresses.mockResolvedValue([{ id, surname, zipCode, district, street, number, complement }])
  })

  beforeEach(() => {
    sut = new ListAddressesController(listAddresses)
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
    expect(data).toEqual([{ id, surname, zipCode, district, street, number, complement }])
  })
})
