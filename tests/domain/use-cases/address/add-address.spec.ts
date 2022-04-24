import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { AddAddress, AddAddressUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'
import faker from 'faker'
import { AddAddressRepository } from '@/domain/contracts/database/repositories/address'

describe('AddAddressUseCase', () => {
  let sut: AddAddress

  let accountId: string
  let surname: string
  let zipCode: string
  let district: string
  let address: string
  let number: number
  let complement: string

  let error: Error

  const searchAddressByZipCode = mock<SearchAddressByZipCode>()
  const addressRepository = mock<AddAddressRepository>()

  beforeEach(() => {
    sut = AddAddressUseCase(searchAddressByZipCode, addressRepository)

    accountId = faker.datatype.uuid()
    surname = faker.random.word()
    zipCode = faker.address.zipCode('########')
    district = faker.random.words(2)
    address = faker.address.streetName()
    number = faker.datatype.number()
    complement = faker.random.words(3)
    error = new Error(faker.random.word())

    searchAddressByZipCode.search.mockResolvedValue({ district, address })
  })

  it('Should call SearchAddressByZipCode with correct zipcode', async () => {
    await sut({ accountId, surname, zipCode, district, address, number, complement })

    expect(searchAddressByZipCode.search).toHaveBeenCalledWith({ zipCode })
    expect(searchAddressByZipCode.search).toHaveBeenCalledTimes(1)
  })

  it('Should return undefined if SearchAddressByZipCode return undefined', async () => {
    searchAddressByZipCode.search.mockResolvedValueOnce(undefined)

    const result = await sut({ accountId, surname, zipCode, district, address, number, complement })

    expect(result).toBe(false)
  })

  it('Should rethrow if SearchAddressByZipCode throws', async () => {
    searchAddressByZipCode.search.mockRejectedValueOnce(error)

    const promise = sut({ accountId, surname, zipCode, district, address, number, complement })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call AddAddressRepository with correct values', async () => {
    await sut({ accountId, surname, zipCode, district, address, number, complement })

    expect(addressRepository.create).toHaveBeenCalledWith({ accountId, surname, zipCode, district, address, number, complement })
    expect(addressRepository.create).toHaveBeenCalledTimes(1)
  })

  it('Should return true on success', async () => {
    const result = await sut({ accountId, surname, zipCode, district, address, number, complement })

    expect(result).toBe(true)
  })

  it('Should rethrow if AddAddressRepository throws', async () => {
    addressRepository.create.mockRejectedValueOnce(error)

    const promise = sut({ accountId, surname, zipCode, district, address, number, complement })

    await expect(promise).rejects.toThrow(error)
  })
})
