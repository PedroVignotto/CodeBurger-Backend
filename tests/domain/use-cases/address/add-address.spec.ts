import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { AddAddress, AddAddressUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('AddAddressUseCase', () => {
  let sut: AddAddress

  let zipCode: string

  const searchAddressByZipCode = mock<SearchAddressByZipCode>()

  beforeEach(() => {
    sut = AddAddressUseCase(searchAddressByZipCode)

    zipCode = faker.address.zipCode('########')
  })

  it('Should call SearchAddressByZipCode with correct zipcode', async () => {
    await sut({ zipCode })

    expect(searchAddressByZipCode.search).toHaveBeenCalledWith({ zipCode })
    expect(searchAddressByZipCode.search).toHaveBeenCalledTimes(1)
  })
})
