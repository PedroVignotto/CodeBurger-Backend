import { accountParams, addressParams } from '@/tests/mocks'
import { CheckAddressByIdRepository, ListAddressesRepository, UpdateAddressRepository } from '@/domain/contracts/database/repositories/address'
import { UpdateAddress, updateAddressUseCase } from '@/domain/use-cases/address'
import { NonExistentFieldError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('UpdateAddressUseCase', () => {
  let sut: UpdateAddress

  const { id: accountId } = accountParams
  const { id, surname, number, complement, error } = addressParams

  const addressRepository = mock<CheckAddressByIdRepository & UpdateAddressRepository & ListAddressesRepository>()

  beforeAll(() => {
    addressRepository.checkById.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = updateAddressUseCase(addressRepository)
  })

  it('Should call CheckAddressByIdRepository with correct id', async () => {
    await sut({ accountId, id })

    expect(addressRepository.checkById).toHaveBeenCalledWith({ id })
    expect(addressRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('Should throw NonExistentFieldError if CheckAddressByIdRepository return false', async () => {
    addressRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut({ accountId, id })

    await expect(promise).rejects.toThrow(new NonExistentFieldError('id'))
  })

  it('Should rethrow if CheckAddressByIdRepository throws', async () => {
    addressRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut({ accountId, id })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call ListAddressesRepository with correct value', async () => {
    await sut({ accountId, id, surname, number, complement })

    expect(addressRepository.list).toHaveBeenCalledWith({ accountId })
    expect(addressRepository.list).toHaveBeenCalledTimes(1)
  })

  it('Should call UpdateAddressRepository with correct values', async () => {
    await sut({ accountId, id, surname, number, complement })

    expect(addressRepository.update).toHaveBeenCalledWith({ id, surname, number, complement })
    expect(addressRepository.update).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if UpdateAddressRepository throws', async () => {
    addressRepository.update.mockRejectedValueOnce(error)

    const promise = sut({ accountId, id })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should return undefined on success', async () => {
    const result = await sut({ accountId, id, surname, number, complement })

    expect(result).toBeUndefined()
  })
})
