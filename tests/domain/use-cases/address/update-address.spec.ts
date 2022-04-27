import { addressParams } from '@/tests/mocks'
import { CheckAddressByIdRepository } from '@/domain/contracts/database/repositories/address'
import { UpdateAddress, updateAddressUseCase } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'

describe('UpdateAddressUseCase', () => {
  let sut: UpdateAddress

  const { id } = addressParams

  const addressRepository = mock<CheckAddressByIdRepository>()

  beforeAll(() => {
    addressRepository.checkById.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = updateAddressUseCase(addressRepository)
  })

  it('Should call CheckAddressByIdRepository with correct id', async () => {
    await sut({ id })

    expect(addressRepository.checkById).toHaveBeenCalledWith({ id })
    expect(addressRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('Should return false if CheckAddressByIdRepository return false', async () => {
    addressRepository.checkById.mockResolvedValueOnce(false)

    const result = await sut({ id })

    expect(result).toBe(false)
  })
})
