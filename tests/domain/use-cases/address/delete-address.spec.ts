import { addressParams } from '@/tests/mocks'
import { CheckAddressByIdRepository, DeleteAddressRepository } from '@/domain/contracts/database/repositories/address'
import { deleteAddressUseCase, DeleteAddress } from '@/domain/use-cases/address'
import { NonExistentFieldError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('DeleteAddressUseCase', () => {
  let sut: DeleteAddress

  const { id, error } = addressParams

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

  it('Should call DeleteAddressRepository with correct id', async () => {
    await sut({ id })

    expect(addressRepository.delete).toHaveBeenCalledWith({ id })
    expect(addressRepository.delete).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if DeleteAddressRepository throws', async () => {
    addressRepository.delete.mockRejectedValueOnce(error)

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should return undefined on success', async () => {
    const result = await sut({ id })

    expect(result).toBeUndefined()
  })
})
