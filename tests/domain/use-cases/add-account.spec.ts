import { CheckAccountByEmailRepository } from '@/domain/contracts/repositories'
import { AddAccount, setupAddAccount } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddAccount', () => {
  let sut: AddAccount
  let email: string
  let checkAccountByEmailRepository: MockProxy<CheckAccountByEmailRepository>

  beforeAll(() => {
    email = 'any_email@mail.com'
    checkAccountByEmailRepository = mock()
  })

  beforeEach(() => {
    sut = setupAddAccount(checkAccountByEmailRepository)
  })

  it('Should call checkAccountByEmailRepository with correct email', async () => {
    await sut({ email })

    expect(checkAccountByEmailRepository.checkByEmail).toHaveBeenCalledWith({ email })
    expect(checkAccountByEmailRepository.checkByEmail).toHaveBeenCalledTimes(1)
  })
})
