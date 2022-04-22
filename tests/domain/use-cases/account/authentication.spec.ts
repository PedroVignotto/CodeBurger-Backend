import { TokenGenerator, HashComparer } from '@/domain/contracts/gateways'
import { LoadAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'
import { Authentication, AuthenticationUseCase } from '@/domain/use-cases/account'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('Authentication', () => {
  let sut: Authentication

  let id: string
  let name: string
  let email: string
  let password: string
  let hashedPassword: string
  let createdAt: Date
  let accessToken: string
  let error: Error

  const accountRepository = mock<LoadAccountByEmailRepository>()
  const hashComparer = mock<HashComparer>()
  const token = mock<TokenGenerator>()

  beforeEach(() => {
    sut = AuthenticationUseCase(accountRepository, hashComparer, token)

    id = faker.datatype.uuid()
    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password(8)
    hashedPassword = faker.internet.password(16)
    createdAt = faker.date.recent()
    accessToken = faker.datatype.uuid()
    error = new Error(faker.random.word())

    accountRepository.loadByEmail.mockResolvedValue({ id, name, email, password: hashedPassword, createdAt })
    hashComparer.compare.mockResolvedValue(true)
    token.generate.mockResolvedValue(accessToken)
  })

  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    await sut({ email, password })

    expect(accountRepository.loadByEmail).toHaveBeenCalledWith({ email })
    expect(accountRepository.loadByEmail).toHaveBeenCalledTimes(1)
  })

  it('Should return undefined if LoadAccountByEmailRepository return undefined', async () => {
    accountRepository.loadByEmail.mockResolvedValueOnce(undefined)

    const account = await sut({ email, password })

    expect(account).toBeUndefined()
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

  it('Should return undefined if HashComparer return false', async () => {
    hashComparer.compare.mockResolvedValueOnce(false)

    const created = await sut({ email, password })

    expect(created).toBeUndefined()
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
