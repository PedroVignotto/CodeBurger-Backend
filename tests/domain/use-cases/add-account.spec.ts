import { HashGenerator } from '@/domain/contracts/gateways'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/domain/contracts/repositories'
import { AddAccount, AddAccountUseCase } from '@/domain/use-cases'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('AddAccount', () => {
  let sut: AddAccount

  let id: string
  let name: string
  let email: string
  let password: string
  let hashedPassword: string
  let createdAt: Date
  let error: string

  const accountRepository = mock<CheckAccountByEmailRepository & AddAccountRepository>()
  const hashGenerator = mock<HashGenerator>()

  beforeEach(() => {
    sut = AddAccountUseCase(accountRepository, hashGenerator)

    id = faker.datatype.uuid()
    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password(8)
    hashedPassword = faker.internet.password(16)
    createdAt = faker.date.recent()
    error = faker.random.word()

    accountRepository.checkByEmail.mockResolvedValue(false)
    accountRepository.create.mockResolvedValue({ id, name, email, password, createdAt })
    hashGenerator.generate.mockResolvedValue(hashedPassword)
  })

  it('Should call CheckAccountByEmailRepository with correct email', async () => {
    await sut({ name, email, password })

    expect(accountRepository.checkByEmail).toHaveBeenCalledWith({ email })
    expect(accountRepository.checkByEmail).toHaveBeenCalledTimes(1)
  })

  it('Should return false if CheckAccountByEmailRepository return true', async () => {
    accountRepository.checkByEmail.mockResolvedValueOnce(true)

    const created = await sut({ name, email, password })

    expect(created).toBe(false)
  })

  it('Should rethrow if CheckAccountByEmailRepository throws', async () => {
    accountRepository.checkByEmail.mockRejectedValueOnce(new Error(error))

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new Error(error))
  })

  it('Should call HashGenerator with correct plaintext', async () => {
    await sut({ name, email, password })

    expect(hashGenerator.generate).toHaveBeenCalledWith({ plaintext: password })
    expect(hashGenerator.generate).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if HashGenerator throws', async () => {
    hashGenerator.generate.mockRejectedValueOnce(new Error(error))

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new Error(error))
  })

  it('Should call AddAccountRepository with correct values', async () => {
    await sut({ name, email, password })

    expect(accountRepository.create).toHaveBeenCalledWith({ name, email, password: hashedPassword })
    expect(accountRepository.create).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if AddAccountRepository throws', async () => {
    accountRepository.create.mockRejectedValueOnce(new Error(error))

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new Error(error))
  })

  it('Should return true on success', async () => {
    const created = await sut({ name, email, password })

    expect(created).toBe(true)
  })
})
