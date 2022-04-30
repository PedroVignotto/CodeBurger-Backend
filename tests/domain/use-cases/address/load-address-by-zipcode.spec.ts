import { addressParams } from '@/tests/mocks'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { LoadAddressByZipCode, loadAddressByZipCodeUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'
import { FieldNotFoundError } from '@/domain/errors'

describe('LoadAddressByZipCodeUseCase', () => {
  let sut: LoadAddressByZipCode

  const { zipCode, district, street, error } = addressParams

  const searchAddressByZipCode = mock<SearchAddressByZipCode>()

  beforeAll(() => {
    searchAddressByZipCode.search.mockResolvedValue({ district, street })
  })

  beforeEach(() => {
    sut = loadAddressByZipCodeUseCase(searchAddressByZipCode)
  })

  it('Should call SearchAddressByZipCode with correct zipcode', async () => {
    await sut({ zipCode })

    expect(searchAddressByZipCode.search).toHaveBeenCalledWith({ zipCode })
    expect(searchAddressByZipCode.search).toHaveBeenCalledTimes(1)
  })

  it('Should return FieldNotFoundError if SearchAddressByZipCode return undefined', async () => {
    searchAddressByZipCode.search.mockResolvedValueOnce(undefined)

    const result = await sut({ zipCode })

    expect(result).toEqual(new FieldNotFoundError('zipCode'))
  })

  it('Should rethrow if SearchAddressByZipCode throws', async () => {
    searchAddressByZipCode.search.mockRejectedValueOnce(error)

    const promise = sut({ zipCode })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should return address on success', async () => {
    const result = await sut({ zipCode })

    expect(result).toEqual({ district, street })
  })
})
