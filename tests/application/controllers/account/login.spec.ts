import { accountParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { LoginController } from '@/application/controllers/account'
import { UnauthorizedError } from '@/application/errors'
import { EmailValidation, RequiredValidation } from '@/application/validation'
import { AuthenticationError } from '@/domain/errors'

describe('LoginController', () => {
  let sut: LoginController

  const { name, email, password, accessToken } = accountParams

  const authentication: jest.Mock = jest.fn()

  beforeAll(() => {
    authentication.mockResolvedValue({ name, accessToken })
  })

  beforeEach(() => {
    sut = new LoginController(authentication)
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

  it('Should return unauthorized if authentication return AuthenticationError', async () => {
    authentication.mockResolvedValueOnce(new AuthenticationError())

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
