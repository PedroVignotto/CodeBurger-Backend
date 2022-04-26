import { Controller } from '@/application/controllers'
import { ListAddressController } from '@/application/controllers/address'

import faker from 'faker'

describe('ListAddressController', () => {
  let sut: ListAddressController

  let accountId: string

  const listAddress: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new ListAddressController(listAddress)

    accountId = faker.datatype.uuid()
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should call listAddress with correct values', async () => {
    await sut.handle({ accountId })

    expect(listAddress).toHaveBeenCalledWith({ accountId })
    expect(listAddress).toHaveBeenCalledTimes(1)
  })
})
