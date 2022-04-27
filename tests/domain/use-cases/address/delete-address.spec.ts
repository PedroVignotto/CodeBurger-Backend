import { addressParams } from '@/tests/mocks'
import { CheckAddressByIdRepository, DeleteAddressRepository } from '@/domain/contracts/database/repositories/address'
import { deleteAddressUseCase, DeleteAddress } from '@/domain/use-cases/address'

import { mock } from 'jest-mock-extended'

describe('DeleteAddressUseCase', () => {
  let sut: DeleteAddress

  const { id } = addressParams

  const addressRepository = mock<CheckAddressByIdRepository & DeleteAddressRepository>()

  beforeAll(() => {
    addressRepository.checkById.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = deleteAddressUseCase(addressRepository)
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

  it('Should call DeleteAddressRepository with correct id', async () => {
    await sut({ id })

    expect(addressRepository.delete).toHaveBeenCalledWith({ id })
    expect(addressRepository.delete).toHaveBeenCalledTimes(1)
  })

  it('Should return true on success', async () => {
    const result = await sut({ id })

    expect(result).toBe(true)
  })
})
