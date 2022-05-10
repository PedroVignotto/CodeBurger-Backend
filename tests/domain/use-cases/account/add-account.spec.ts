import { accountParams } from '@/tests/mocks'
import { HashGenerator } from '@/domain/contracts/gateways'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'
import { AddAccount, addAccountUseCase } from '@/domain/use-cases/account'
import { FieldInUseError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('AddAccount', () => {
  let sut: AddAccount

  const { name, email, password, hashedPassword, error } = accountParams

  const accountRepository = mock<CheckAccountByEmailRepository & AddAccountRepository>()
  const hashGenerator = mock<HashGenerator>()

  beforeAll(() => {
    accountRepository.checkByEmail.mockResolvedValue(false)
    hashGenerator.generate.mockResolvedValue(hashedPassword)
  })

  beforeEach(() => {
    sut = addAccountUseCase(accountRepository, hashGenerator)
  })

  it('Should call CheckAccountByEmailRepository with correct email', async () => {
    await sut({ name, email, password })

    expect(accountRepository.checkByEmail).toHaveBeenCalledWith({ email })
    expect(accountRepository.checkByEmail).toHaveBeenCalledTimes(1)
  })

  it('Should throw FieldInUseError if CheckAccountByEmailRepository return true', async () => {
    accountRepository.checkByEmail.mockResolvedValueOnce(true)

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new FieldInUseError('email'))
  })

  it('Should rethrow if CheckAccountByEmailRepository throws', async () => {
    accountRepository.checkByEmail.mockRejectedValueOnce(error)

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call HashGenerator with correct plaintext', async () => {
    await sut({ name, email, password })

    expect(hashGenerator.generate).toHaveBeenCalledWith({ plaintext: password })
    expect(hashGenerator.generate).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if HashGenerator throws', async () => {
    hashGenerator.generate.mockRejectedValueOnce(error)

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call AddAccountRepository with correct values', async () => {
    await sut({ name, email, password })

    expect(accountRepository.create).toHaveBeenCalledWith({ name, email, password: hashedPassword })
    expect(accountRepository.create).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if AddAccountRepository throws', async () => {
    accountRepository.create.mockRejectedValueOnce(error)

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should return undefined on success', async () => {
    const result = await sut({ name, email, password })

    expect(result).toBeUndefined()
  })
})
