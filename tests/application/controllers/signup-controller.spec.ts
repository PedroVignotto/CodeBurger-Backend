import { SignUpController } from '@/application/controllers'

import faker from 'faker'

describe('SignUpController', () => {
  let sut: SignUpController
  let name: string
  let email: string
  let password: string
  let passwordConfirmation: string
  let addAccount: jest.Mock

  beforeAll(() => {
    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password(8)
    passwordConfirmation = password

    addAccount = jest.fn()
  })

  beforeEach(() => {
    sut = new SignUpController(addAccount)
  })

  it('Should call addAccount with correct values', async () => {
    await sut.perform({ name, email, password, passwordConfirmation })

    expect(addAccount).toHaveBeenCalledWith({ name, email, password })
    expect(addAccount).toHaveBeenCalledTimes(1)
  })
})
