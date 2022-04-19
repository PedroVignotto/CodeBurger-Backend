import { LoadAccountByEmailRepository } from '@/domain/contracts/repositories'
import { Authentication, setupAuthentication } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'
import faker from 'faker'

describe('AddAccount', () => {
  let sut: Authentication
  let email: string
  let loadAccountByEmailRepository: MockProxy<LoadAccountByEmailRepository>

  beforeAll(() => {
    email = faker.internet.email()

    loadAccountByEmailRepository = mock()
  })

  beforeEach(() => {
    sut = setupAuthentication(loadAccountByEmailRepository)
  })

  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    await sut({ email })

    expect(loadAccountByEmailRepository.loadByEmail).toHaveBeenCalledWith({ email })
    expect(loadAccountByEmailRepository.loadByEmail).toHaveBeenCalledTimes(1)
  })
})
