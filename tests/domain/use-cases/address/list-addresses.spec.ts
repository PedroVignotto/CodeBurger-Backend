import { ListAddressRepository } from '@/domain/contracts/database/repositories/address'
import { ListAddress, ListAddressUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('ListAddressUseCase', () => {
  let sut: ListAddress

  let accountId: string
  let error: Error

  const addressRepository = mock<ListAddressRepository>()

  beforeEach(() => {
    sut = ListAddressUseCase(addressRepository)

    accountId = faker.datatype.uuid()
    error = new Error(faker.random.word())

    addressRepository.list.mockResolvedValue([])
  })

  it('Should call ListAddressRepository with correct accountId', async () => {
    await sut({ accountId })

    expect(addressRepository.list).toHaveBeenCalledWith({ accountId })
    expect(addressRepository.list).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if ListAddressRepository throws', async () => {
    addressRepository.list.mockRejectedValueOnce(error)

    const promise = sut({ accountId })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should return a address list on success', async () => {
    const result = await sut({ accountId })

    expect(result).toEqual([])
  })
})
