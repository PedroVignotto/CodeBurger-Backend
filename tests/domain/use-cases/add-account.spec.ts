import { Hasher } from '@/domain/contracts/gateways'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/domain/contracts/repositories'
import { AddAccount, setupAddAccount } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'
import faker from 'faker'

describe('AddAccount', () => {
  let sut: AddAccount
  let id: string
  let name: string
  let email: string
  let password: string
  let hashedPassword: string
  let error: string
  let checkAccountByEmailRepository: MockProxy<CheckAccountByEmailRepository>
  let hasher: MockProxy<Hasher>
  let addAccountRepository: MockProxy<AddAccountRepository>

  beforeAll(() => {
    id = faker.datatype.uuid()
    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password(8)
    hashedPassword = faker.internet.password(16)
    error = faker.random.word()

    checkAccountByEmailRepository = mock()
    checkAccountByEmailRepository.checkByEmail.mockResolvedValue(false)
    hasher = mock()
    hasher.hash.mockResolvedValue(hashedPassword)
    addAccountRepository = mock()
    addAccountRepository.create.mockResolvedValue({ id, name, email, password })
  })

  beforeEach(() => {
    sut = setupAddAccount(checkAccountByEmailRepository, hasher, addAccountRepository)
  })

  it('Should call CheckAccountByEmailRepository with correct email', async () => {
    await sut({ name, email, password })

    expect(checkAccountByEmailRepository.checkByEmail).toHaveBeenCalledWith({ email })
    expect(checkAccountByEmailRepository.checkByEmail).toHaveBeenCalledTimes(1)
  })

  it('Should return false if CheckAccountByEmailRepository return true', async () => {
    checkAccountByEmailRepository.checkByEmail.mockResolvedValueOnce(true)

    const created = await sut({ name, email, password })

    expect(created).toBe(false)
  })

  it('Should rethrow if CheckAccountByEmailRepository throws', async () => {
    checkAccountByEmailRepository.checkByEmail.mockRejectedValueOnce(new Error(error))

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new Error(error))
  })

  it('Should call Hasher with correct plaintext', async () => {
    await sut({ name, email, password })

    expect(hasher.hash).toHaveBeenCalledWith({ plaintext: password })
    expect(hasher.hash).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if Hasher throws', async () => {
    hasher.hash.mockRejectedValueOnce(new Error(error))

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new Error(error))
  })

  it('Should call AddAccountRepository with correct values', async () => {
    await sut({ name, email, password })

    expect(addAccountRepository.create).toHaveBeenCalledWith({ name, email, password: hashedPassword })
    expect(addAccountRepository.create).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if AddAccountRepository throws', async () => {
    addAccountRepository.create.mockRejectedValueOnce(new Error(error))

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new Error(error))
  })

  it('Should return true on success', async () => {
    const created = await sut({ name, email, password })

    expect(created).toBe(true)
  })
})