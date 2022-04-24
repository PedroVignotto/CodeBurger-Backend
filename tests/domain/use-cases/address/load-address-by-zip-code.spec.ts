import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { LoadAddressByZipCode, LoadAddressByZipCodeUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('LoadAddressByZipCodeUseCase', () => {
  let sut: LoadAddressByZipCode

  let zipCode: string

  const searchAddressByZipCode = mock<SearchAddressByZipCode>()

  beforeEach(() => {
    sut = LoadAddressByZipCodeUseCase(searchAddressByZipCode)

    zipCode = faker.address.zipCode('########')
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
})
