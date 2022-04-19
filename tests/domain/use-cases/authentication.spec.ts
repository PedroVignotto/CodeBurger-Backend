import { LoadAccountByEmailRepository } from '@/domain/contracts/repositories'
import { Authentication, setupAuthentication } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'
import faker from 'faker'

describe('Authentication', () => {
  let sut: Authentication
  let id: string
  let name: string
  let email: string
  let password: string
  let error: string
  let loadAccountByEmailRepository: MockProxy<LoadAccountByEmailRepository>

  beforeAll(() => {
    id = faker.datatype.uuid()
    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password(8)
    error = faker.random.word()

    loadAccountByEmailRepository = mock()
    loadAccountByEmailRepository.loadByEmail.mockResolvedValue({ id, name, email, password })
  })

  beforeEach(() => {
    sut = setupAuthentication(loadAccountByEmailRepository)
  })

  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    await sut({ email })

    expect(loadAccountByEmailRepository.loadByEmail).toHaveBeenCalledWith({ email })
    expect(loadAccountByEmailRepository.loadByEmail).toHaveBeenCalledTimes(1)
  })

  it('Should return undefined if LoadAccountByEmailRepository return undefined', async () => {
    loadAccountByEmailRepository.loadByEmail.mockResolvedValueOnce(undefined)

    const account = await sut({ email })

    expect(account).toBeUndefined()
  })

  it('Should rethrow if LoadAccountByEmailRepository throws', async () => {
    loadAccountByEmailRepository.loadByEmail.mockRejectedValueOnce(new Error(error))

    const promise = sut({ email })

    await expect(promise).rejects.toThrow(new Error(error))
  })
})
