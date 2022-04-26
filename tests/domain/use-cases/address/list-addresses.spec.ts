import { addressParams } from '@/tests/mocks'
import { ListAddressesRepository } from '@/domain/contracts/database/repositories/address'
import { ListAddresses, listAddressesUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'

describe('ListAddressUseCase', () => {
  let sut: ListAddresses

  const { accountId, error } = addressParams

  const addressRepository = mock<ListAddressesRepository>()

  beforeAll(() => {
    addressRepository.list.mockResolvedValue([])
  })

  beforeEach(() => {
    sut = listAddressesUseCase(addressRepository)
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
