import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { LoadAddressByZipCode, LoadAddressByZipCodeUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('LoadAddressByZipCodeUseCase', () => {
  let sut: LoadAddressByZipCode

  let zipCode: string
  let district: string
  let address: string
  let error: Error

  const searchAddressByZipCode = mock<SearchAddressByZipCode>()

  beforeEach(() => {
    sut = LoadAddressByZipCodeUseCase(searchAddressByZipCode)

    zipCode = faker.address.zipCode('########')
    district = faker.random.words(2)
    address = faker.address.streetName()
    error = new Error(faker.random.word())

    searchAddressByZipCode.search.mockResolvedValue({ district, address })
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

  it('Should return district and address on success', async () => {
    const result = await sut({ zipCode })

    expect(result).toEqual({ district, address })
  })
})
