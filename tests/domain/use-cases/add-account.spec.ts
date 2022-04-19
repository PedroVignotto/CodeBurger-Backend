import { Hasher } from '@/domain/contracts/gateways'
import { CheckAccountByEmailRepository } from '@/domain/contracts/repositories'
import { AddAccount, setupAddAccount } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddAccount', () => {
  let sut: AddAccount
  let email: string
  let password: string
  let checkAccountByEmailRepository: MockProxy<CheckAccountByEmailRepository>
  let hasher: MockProxy<Hasher>

  beforeAll(() => {
    email = 'any_email@mail.com'
    password = 'any_password'
    checkAccountByEmailRepository = mock()
    checkAccountByEmailRepository.checkByEmail.mockResolvedValue(false)
    hasher = mock()
    hasher.hash.mockResolvedValue('any_digest')
  })

  beforeEach(() => {
    sut = setupAddAccount(checkAccountByEmailRepository, hasher)
  })

  it('Should call CheckAccountByEmailRepository with correct email', async () => {
    await sut({ email, password })

    expect(checkAccountByEmailRepository.checkByEmail).toHaveBeenCalledWith({ email })
    expect(checkAccountByEmailRepository.checkByEmail).toHaveBeenCalledTimes(1)
  })

  it('Should return undefined if CheckAccountByEmailRepository return true', async () => {
    checkAccountByEmailRepository.checkByEmail.mockResolvedValueOnce(true)

    const account = await sut({ email, password })

    expect(account).toBeUndefined()
  })

  it('Should rethrow if CheckAccountByEmailRepository throws', async () => {
    checkAccountByEmailRepository.checkByEmail.mockRejectedValueOnce(new Error('any_error'))

    const promise = sut({ email, password })

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('Should call Hasher with correct plaintext', async () => {
    await sut({ email, password })

    expect(hasher.hash).toHaveBeenCalledWith({ plaintext: password })
    expect(hasher.hash).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if Hasher throws', async () => {
    hasher.hash.mockRejectedValueOnce(new Error('any_error'))

    const promise = sut({ email, password })

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
