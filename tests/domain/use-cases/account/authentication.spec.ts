import { accountParams } from '@/tests/mocks'
import { TokenGenerator, HashComparer } from '@/domain/contracts/gateways'
import { LoadAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'
import { Authentication, authenticationUseCase } from '@/domain/use-cases/account'
import { AuthenticationError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('Authentication', () => {
  let sut: Authentication

  const { id, name, email, password, hashedPassword, accessToken, createdAt, error } = accountParams

  const accountRepository = mock<LoadAccountByEmailRepository>()
  const hashComparer = mock<HashComparer>()
  const token = mock<TokenGenerator>()

  beforeAll(() => {
    accountRepository.loadByEmail.mockResolvedValue({ id, name, email, password: hashedPassword, createdAt })
    hashComparer.compare.mockResolvedValue(true)
    token.generate.mockResolvedValue(accessToken)
  })

  beforeEach(() => {
    sut = authenticationUseCase(accountRepository, hashComparer, token)
  })

  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    await sut({ email, password })

    expect(accountRepository.loadByEmail).toHaveBeenCalledWith({ email })
    expect(accountRepository.loadByEmail).toHaveBeenCalledTimes(1)
  })

  it('Should return AuthenticationError if LoadAccountByEmailRepository return undefined', async () => {
    accountRepository.loadByEmail.mockResolvedValueOnce(undefined)

    const result = await sut({ email, password })

    expect(result).toEqual(new AuthenticationError())
  })

  it('Should rethrow if LoadAccountByEmailRepository throws', async () => {
    accountRepository.loadByEmail.mockRejectedValueOnce(error)

    const promise = sut({ email, password })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call HashComparer with correct values', async () => {
    await sut({ email, password })

    expect(hashComparer.compare).toHaveBeenCalledWith({ plaintext: password, digest: hashedPassword })
    expect(hashComparer.compare).toHaveBeenCalledTimes(1)
  })

  it('Should return AuthenticationError if HashComparer return false', async () => {
    hashComparer.compare.mockResolvedValueOnce(false)

    const result = await sut({ email, password })

    expect(result).toEqual(new AuthenticationError())
  })

  it('Should rethrow if HashComparer throws', async () => {
    hashComparer.compare.mockRejectedValueOnce(error)

    const promise = sut({ email, password })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call TokenGenerator with correct key', async () => {
    await sut({ email, password })

    expect(token.generate).toHaveBeenCalledWith({ key: id })
    expect(token.generate).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if TokenGenerator throws', async () => {
    token.generate.mockRejectedValueOnce(error)

    const promise = sut({ email, password })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should return name and accessToken on success', async () => {
    const result = await sut({ email, password })

    expect(result).toEqual({ name, accessToken })
  })
})
