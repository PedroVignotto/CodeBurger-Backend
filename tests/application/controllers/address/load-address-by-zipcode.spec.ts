import { Controller } from '@/application/controllers'
import { LoadAddressByZipCodeController } from '@/application/controllers/address'

describe('LoadAddressByZipCodeController', () => {
  let sut: LoadAddressByZipCodeController

  const loadAddressByZipCode: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new LoadAddressByZipCodeController(loadAddressByZipCode)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
