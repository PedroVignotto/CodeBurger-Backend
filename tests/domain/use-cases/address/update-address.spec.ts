import { addressParams } from '@/tests/mocks'
import { CheckAddressByIdRepository, UpdateAddressRepository } from '@/domain/contracts/database/repositories/address'
import { UpdateAddress, updateAddressUseCase } from '@/domain/use-cases/address'
import { NonExistentFieldError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('UpdateAddressUseCase', () => {
  let sut: UpdateAddress

  const { id, surname, number, complement, error } = addressParams

  const addressRepository = mock<CheckAddressByIdRepository & UpdateAddressRepository>()

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

  it('Should return NonExistentFieldError if CheckAddressByIdRepository return false', async () => {
    addressRepository.checkById.mockResolvedValueOnce(false)

    const result = await sut({ id })

    expect(result).toEqual(new NonExistentFieldError('id'))
  })

  it('Should rethrow if CheckAddressByIdRepository throws', async () => {
    addressRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call UpdateAddressRepository with correct values', async () => {
    await sut({ id, surname, number, complement })

    expect(addressRepository.update).toHaveBeenCalledWith({ id, surname, number, complement })
    expect(addressRepository.update).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if UpdateAddressRepository throws', async () => {
    addressRepository.update.mockRejectedValueOnce(error)

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should return undefined on success', async () => {
    const result = await sut({ id, surname, number, complement })

    expect(result).toBeUndefined()
  })
})
