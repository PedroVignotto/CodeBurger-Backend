import { Controller, LoginController } from '@/application/controllers'
import { UnauthorizedError } from '@/application/errors'
import { EmailValidation, RequiredValidation } from '@/application/validation'

import faker from 'faker'

describe('LoginController', () => {
  let sut: LoginController

  let name: string
  let email: string
  let password: string
  let accessToken: string

  const authentication: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new LoginController(authentication)

    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password(8)
    accessToken = faker.datatype.uuid()

    authentication.mockResolvedValue({ name, accessToken })
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

  it('Should call authentication with correct values', async () => {
    await sut.handle({ email, password })

    expect(authentication).toHaveBeenCalledWith({ email, password })
    expect(authentication).toHaveBeenCalledTimes(1)
  })

  it('Should return unauthorized if authentication return undefined', async () => {
    authentication.mockResolvedValueOnce(undefined)

    const { statusCode, data } = await sut.handle({ email, password })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('Should return ok if valid data is provided', async () => {
    const { statusCode, data } = await sut.handle({ email, password })

    expect(statusCode).toBe(200)
    expect(data).toEqual({ name, accessToken })
  })
})
