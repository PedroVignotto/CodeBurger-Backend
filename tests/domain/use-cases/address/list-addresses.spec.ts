import { ListAddressesRepository } from '@/domain/contracts/database/repositories/address'
import { ListAddresses, ListAddressesUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('ListAddressUseCase', () => {
  let sut: ListAddresses

  let accountId: string
  let error: Error

  const addressRepository = mock<ListAddressesRepository>()

  beforeEach(() => {
    sut = ListAddressesUseCase(addressRepository)

    accountId = faker.datatype.uuid()
    error = new Error(faker.random.word())

    addressRepository.list.mockResolvedValue([])
  })

  it('Should call ListAddressesRepository with correct accountId', async () => {
    await sut({ accountId })

    expect(addressRepository.list).toHaveBeenCalledWith({ accountId })
    expect(addressRepository.list).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if ListAddressesRepository throws', async () => {
    addressRepository.list.mockRejectedValueOnce(error)

    const promise = sut({ accountId })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should return a address list on success', async () => {
    const result = await sut({ accountId })

    expect(result).toEqual([])
  })
})
