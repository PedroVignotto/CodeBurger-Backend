import { Controller, SignUpController } from '@/application/controllers'
import { CompareValidation, EmailValidation, RequiredValidation } from '@/application/validation'
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
  let accessToken: string

  const addAccount: jest.Mock = jest.fn()
  const authentication: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new SignUpController(addAccount, authentication)

    id = faker.datatype.uuid()
    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password(8)
    hashedPassword = faker.internet.password(16)
    passwordConfirmation = password
    accessToken = faker.datatype.uuid()

    addAccount.mockResolvedValue({ id, name, email, password: hashedPassword })
    authentication.mockResolvedValue({ name, accessToken })
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ name, email, password, passwordConfirmation })

    expect(validators).toEqual([
      new RequiredValidation(name, 'name'),
      new RequiredValidation(email, 'email'),
      new EmailValidation(email, 'email'),
      new RequiredValidation(password, 'password'),
      new RequiredValidation(passwordConfirmation, 'passwordConfirmation'),
      new CompareValidation(passwordConfirmation, password, 'passwordConfirmation')
    ])
  })

  it('Should call addAccount with correct values', async () => {
    await sut.handle({ name, email, password, passwordConfirmation })

    expect(addAccount).toHaveBeenCalledWith({ name, email, password })
    expect(addAccount).toHaveBeenCalledTimes(1)
  })

  it('Should return forbidden if addAccount return false', async () => {
    addAccount.mockResolvedValueOnce(false)

    const { statusCode, data } = await sut.handle({ name, email, password, passwordConfirmation })

    expect(statusCode).toBe(403)
    expect(data).toEqual(new ForbiddenError())
  })

  it('Should call authentication with correct values', async () => {
    await sut.handle({ name, email, password, passwordConfirmation })

    expect(authentication).toHaveBeenCalledWith({ email, password })
    expect(authentication).toHaveBeenCalledTimes(1)
  })

  it('Should return created if valid data is provided', async () => {
    const { statusCode, data } = await sut.handle({ name, email, password, passwordConfirmation })

    expect(statusCode).toBe(201)
    expect(data).toEqual({ name, accessToken })
  })
})
