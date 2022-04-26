import { addressParams } from '@/tests/mocks'
import { AddAddressRepository } from '@/domain/contracts/database/repositories/address'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { AddAddress, addAddressUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'

describe('AddAddressUseCase', () => {
  let sut: AddAddress

  const { accountId, surname, zipCode, district, street, number, complement, error } = addressParams

  const searchAddressByZipCode = mock<SearchAddressByZipCode>()
  const addressRepository = mock<AddAddressRepository>()

  beforeAll(() => {
    searchAddressByZipCode.search.mockResolvedValue({ district, street })
  })

  beforeEach(() => {
    sut = addAddressUseCase(searchAddressByZipCode, addressRepository)
  })

  it('Should call SearchAddressByZipCode with correct zipcode', async () => {
    await sut({ accountId, surname, zipCode, district, street, number, complement })

    expect(searchAddressByZipCode.search).toHaveBeenCalledWith({ zipCode })
    expect(searchAddressByZipCode.search).toHaveBeenCalledTimes(1)
  })

  it('Should return undefined if SearchAddressByZipCode return undefined', async () => {
    searchAddressByZipCode.search.mockResolvedValueOnce(undefined)

    const result = await sut({ accountId, surname, zipCode, district, street, number, complement })

    expect(result).toBe(false)
  })

  it('Should rethrow if SearchAddressByZipCode throws', async () => {
    searchAddressByZipCode.search.mockRejectedValueOnce(error)

    const promise = sut({ accountId, surname, zipCode, district, street, number, complement })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call AddAddressRepository with correct values', async () => {
    await sut({ accountId, surname, zipCode, district, street, number, complement })

    expect(addressRepository.create).toHaveBeenCalledWith({ accountId, surname, zipCode, district, street, number, complement })
    expect(addressRepository.create).toHaveBeenCalledTimes(1)
  })

  it('Should return true on success', async () => {
    const result = await sut({ accountId, surname, zipCode, district, street, number, complement })

    expect(result).toBe(true)
  })

  it('Should rethrow if AddAddressRepository throws', async () => {
    addressRepository.create.mockRejectedValueOnce(error)

    const promise = sut({ accountId, surname, zipCode, district, street, number, complement })

    await expect(promise).rejects.toThrow(error)
  })
})
