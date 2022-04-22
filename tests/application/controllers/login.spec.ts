import { Controller, LoginController } from '@/application/controllers'
import { EmailValidation, RequiredValidation } from '@/application/validation'

import faker from 'faker'

describe('LoginController', () => {
  let sut: LoginController

  let email: string
  let password: string

  const authentication: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new LoginController(authentication)

    email = faker.internet.email()
    password = faker.internet.password(8)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ email, password })

    expect(validators).toEqual([
      new RequiredValidation(email, 'email'),
      new EmailValidation(email, 'email'),
      new RequiredValidation(password, 'password')
    ])
  })
})
