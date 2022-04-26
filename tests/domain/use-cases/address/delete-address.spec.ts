import { addressParams } from '@/tests/mocks'
import { CheckAddressByIdRepository } from '@/domain/contracts/database/repositories/address'
import { deleteAddressUseCase, DeleteAddress } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'

describe('DeleteAddressUseCase', () => {
  let sut: DeleteAddress

  const { id } = addressParams

  const addressRepository = mock<CheckAddressByIdRepository>()

  beforeEach(() => {
    sut = deleteAddressUseCase(addressRepository)
  })

  it('Should call CheckAddressByIdRepository with correct id', async () => {
    await sut({ id })

    expect(addressRepository.checkById).toHaveBeenCalledWith({ id })
    expect(addressRepository.checkById).toHaveBeenCalledTimes(1)
  })
})
