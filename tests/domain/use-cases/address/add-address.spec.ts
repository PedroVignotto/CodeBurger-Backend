import { accountParams, addressParams } from '@/tests/mocks'
import { AddAddressRepository, ListAddressesRepository } from '@/domain/contracts/database/repositories/address'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { AddAddress, addAddressUseCase } from '@/domain/use-cases/address'
import { FieldNotFoundError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('AddAddressUseCase', () => {
  let sut: AddAddress

  const { id: accountId } = accountParams
  const { id, surname, zipCode, district, street, number, complement, error } = addressParams

  const searchAddressByZipCode = mock<SearchAddressByZipCode>()
  const addressRepository = mock<AddAddressRepository & ListAddressesRepository>()

  beforeAll(() => {
    searchAddressByZipCode.search.mockResolvedValue({ district, street })
    addressRepository.list.mockResolvedValue([])
    addressRepository.create.mockResolvedValue({ id, surname, zipCode, district, street, number, complement, active: true })
  })

  beforeEach(() => {
    sut = addAddressUseCase(searchAddressByZipCode, addressRepository)
  })

  it('Should call SearchAddressByZipCode with correct zipcode', async () => {
    await sut({ accountId, surname, zipCode, district, street, number, complement })

    expect(searchAddressByZipCode.search).toHaveBeenCalledWith({ zipCode })
    expect(searchAddressByZipCode.search).toHaveBeenCalledTimes(1)
  })

  it('Should throw FieldNotFoundError if SearchAddressByZipCode return undefined', async () => {
    searchAddressByZipCode.search.mockResolvedValueOnce(undefined)

    const promise = sut({ accountId, surname, zipCode, district, street, number, complement })

    await expect(promise).rejects.toThrow(new FieldNotFoundError('zipCode'))
  })

  it('Should rethrow if SearchAddressByZipCode throws', async () => {
    searchAddressByZipCode.search.mockRejectedValueOnce(error)

    const promise = sut({ accountId, surname, zipCode, district, street, number, complement })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call ListAddressesRepository with correct value', async () => {
    await sut({ accountId, surname, zipCode, district, street, number, complement })

    expect(addressRepository.list).toHaveBeenCalledWith({ accountId })
    expect(addressRepository.list).toHaveBeenCalledTimes(1)
  })

  it('Should call AddAddressRepository with active true if the user does not have addresses', async () => {
    await sut({ accountId, surname, zipCode, district, street, number, complement })

    expect(addressRepository.create).toHaveBeenCalledWith({ accountId, surname, zipCode, district, street, number, complement, active: true })
    expect(addressRepository.create).toHaveBeenCalledTimes(1)
  })

  it('Should call AddAddressRepository with active false if the user have addresses', async () => {
    addressRepository.list.mockResolvedValueOnce([addressParams])

    await sut({ accountId, surname, zipCode, district, street, number, complement })

    expect(addressRepository.create).toHaveBeenCalledWith({ accountId, surname, zipCode, district, street, number, complement, active: false })
    expect(addressRepository.create).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if AddAddressRepository throws', async () => {
    addressRepository.create.mockRejectedValueOnce(error)

    const promise = sut({ accountId, surname, zipCode, district, street, number, complement })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should return address on success', async () => {
    const result = await sut({ accountId, surname, zipCode, district, street, number, complement })

    expect(result).toEqual({ id, surname, zipCode, district, street, number, complement, active: true })
  })
})
