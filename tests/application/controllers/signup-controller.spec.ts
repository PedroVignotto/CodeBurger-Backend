import { SignUpController } from '@/application/controllers'
import { ForbiddenError } from '@/application/errors'

import faker from 'faker'

describe('SignUpController', () => {
  let sut: SignUpController
  let id: string
  let name: string
  let email: string
  let password: string
  let passwordConfirmation: string
  let hashedPassword: string
  let addAccount: jest.Mock

  beforeAll(() => {
    id = faker.datatype.uuid()
    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password(8)
    hashedPassword = faker.internet.password(16)
    passwordConfirmation = password

    addAccount = jest.fn()
    addAccount.mockResolvedValue({ id, name, email, password: hashedPassword })
  })

  beforeEach(() => {
    sut = new SignUpController(addAccount)
  })

  it('Should call addAccount with correct values', async () => {
    await sut.perform({ name, email, password, passwordConfirmation })

    expect(addAccount).toHaveBeenCalledWith({ name, email, password })
    expect(addAccount).toHaveBeenCalledTimes(1)
  })

  it('Should return forbidden if addAccount return false', async () => {
    addAccount.mockResolvedValueOnce(false)

    const { statusCode, data } = await sut.perform({ name, email, password, passwordConfirmation })

    expect(statusCode).toBe(403)
    expect(data).toEqual(new ForbiddenError())
  })
})
