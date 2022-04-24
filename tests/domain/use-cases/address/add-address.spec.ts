import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { AddAddress, AddAddressUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('AddAddressUseCase', () => {
  let sut: AddAddress

  let zipCode: string
  let error: Error

  const searchAddressByZipCode = mock<SearchAddressByZipCode>()

  beforeEach(() => {
    sut = AddAddressUseCase(searchAddressByZipCode)

    zipCode = faker.address.zipCode('########')
    error = new Error(faker.random.word())
  })

  it('Should call SearchAddressByZipCode with correct zipcode', async () => {
    await sut({ zipCode })

    expect(searchAddressByZipCode.search).toHaveBeenCalledWith({ zipCode })
    expect(searchAddressByZipCode.search).toHaveBeenCalledTimes(1)
  })

  it('Should return undefined if SearchAddressByZipCode return undefined', async () => {
    searchAddressByZipCode.search.mockResolvedValueOnce(undefined)

    const result = await sut({ zipCode })

    expect(result).toBeUndefined()
  })

  it('Should rethrow if SearchAddressByZipCode throws', async () => {
    searchAddressByZipCode.search.mockRejectedValueOnce(error)

    const promise = sut({ zipCode })

    await expect(promise).rejects.toThrow(error)
  })
})
