import { ForbiddenError, ServerError, UnauthorizedError } from '@/application/errors'
import { AuthenticationMiddleware } from '@/application/middlewares'

import faker from 'faker'

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware

  let role: string
  let accountId: string
  let accessToken: string
  let Authorization: string
  let error: Error

  const authorize: jest.Mock = jest.fn()

  beforeAll(() => {
    role = faker.random.word()
  })

  beforeEach(() => {
    sut = new AuthenticationMiddleware(authorize, role)

    accountId = faker.datatype.uuid()
    accessToken = faker.datatype.uuid()
    Authorization = `Bearer ${accessToken}`
    error = new Error(faker.random.word())

    authorize.mockResolvedValue({ accessToken })
    authorize.mockResolvedValue({ accountId })
  })

  it('Should return unauthorized if Authorization is empty', async () => {
    const { statusCode, data } = await sut.handle({ Authorization: '' })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('Should return unauthorized if Authorization is null', async () => {
    const { statusCode, data } = await sut.handle({ Authorization: null as any })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('Should return unauthorized if Authorization is undefined', async () => {
    const { statusCode, data } = await sut.handle({ Authorization: undefined as any })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('Should call authorize with correct values', async () => {
    await sut.handle({ Authorization })

    expect(authorize).toHaveBeenCalledWith({ accessToken, role })
    expect(authorize).toHaveBeenCalledTimes(1)
  })

  it('Should return forbidden if authorize return undefined', async () => {
    authorize.mockResolvedValueOnce(undefined)

    const { statusCode, data } = await sut.handle({ Authorization })

    expect(statusCode).toBe(403)
    expect(data).toEqual(new ForbiddenError())
  })

  it('Should returns serverError if have any throw', async () => {
    authorize.mockRejectedValueOnce(error)

    const { statusCode, data } = await sut.handle({ Authorization })

    expect(statusCode).toBe(500)
    expect(data).toEqual(new ServerError(error))
  })

  it('Should return ok if valid data is provided', async () => {
    const { statusCode, data } = await sut.handle({ Authorization })

    expect(statusCode).toBe(200)
    expect(data).toEqual({ accountId })
  })
})
