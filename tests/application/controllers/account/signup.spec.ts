import { accountParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { SignUpController } from '@/application/controllers/account'
import { CompareValidation, EmailValidation, RequiredValidation } from '@/application/validation'
import { FieldInUseError } from '@/application/errors'

describe('SignUpController', () => {
  let sut: SignUpController

  const { name, email, password, passwordConfirmation, accessToken } = accountParams

  const addAccount: jest.Mock = jest.fn()
  const authentication: jest.Mock = jest.fn()

  beforeAll(() => {
    addAccount.mockResolvedValue(true)
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

  it('Should return badRequest if addAccount return false', async () => {
    addAccount.mockResolvedValueOnce(false)

    const { statusCode, data } = await sut.handle({ name, email, password, passwordConfirmation })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldInUseError('email'))
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
