import { Controller, SignUpController } from '@/application/controllers'
import { Email, Required } from '@/application/validation'
import { ForbiddenError, UnauthorizedError } from '@/application/errors'

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

  let addAccount: jest.Mock
  let authentication: jest.Mock

  beforeAll(() => {
    id = faker.datatype.uuid()
    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password(8)
    hashedPassword = faker.internet.password(16)
    passwordConfirmation = password
    accessToken = faker.datatype.uuid()

    addAccount = jest.fn()
    addAccount.mockResolvedValue({ id, name, email, password: hashedPassword })
    authentication = jest.fn()
    authentication.mockResolvedValue({ name, accessToken })
  })

  beforeEach(() => {
    sut = new SignUpController(addAccount, authentication)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ name, email, password, passwordConfirmation })

    expect(validators).toEqual([
      new Required(name, 'name'),
      new Required(email, 'email'),
      new Email(email, 'email'),
      new Required(password, 'password'),
      new Required(passwordConfirmation, 'passwordConfirmation')
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

  it('Should return unauthorized if authentication return undefined', async () => {
    authentication.mockResolvedValueOnce(undefined)

    const { statusCode, data } = await sut.handle({ name, email, password, passwordConfirmation })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('Should return created if valid data is provided', async () => {
    const { statusCode, data } = await sut.handle({ name, email, password, passwordConfirmation })

    expect(statusCode).toBe(201)
    expect(data).toEqual({ name, accessToken })
  })
})
