import { ListAddressRepository } from '@/domain/contracts/database/repositories/address'
import { ListAddress, ListAddressUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('ListAddressUseCase', () => {
  let sut: ListAddress

  let accountId: string

  const addressRepository = mock<ListAddressRepository>()

  beforeEach(() => {
    sut = ListAddressUseCase(addressRepository)

    accountId = faker.datatype.uuid()
  })

  it('Should call ListAddressRepository with correct accountId', async () => {
    await sut({ accountId })

    expect(addressRepository.list).toHaveBeenCalledWith({ accountId })
    expect(addressRepository.list).toHaveBeenCalledTimes(1)
  })
})
