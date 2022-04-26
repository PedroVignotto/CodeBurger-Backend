import { accountParams } from '@/tests/mocks'
import { ForbiddenError, ServerError, UnauthorizedError } from '@/application/errors'
import { AuthenticationMiddleware } from '@/application/middlewares'

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware

  const { id: accountId, accessToken, role, error } = accountParams
  const authorization = `Bearer ${accessToken}`

  const authorize: jest.Mock = jest.fn()

  beforeAll(() => {
    authorize.mockResolvedValue({ accountId })
  })

  beforeEach(() => {
    sut = new AuthenticationMiddleware(authorize, role)
  })

  it('Should return unauthorized if authorization is empty', async () => {
    const { statusCode, data } = await sut.handle({ authorization: '' })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('Should return unauthorized if authorization is null', async () => {
    const { statusCode, data } = await sut.handle({ authorization: null as any })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('Should return unauthorized if authorization is undefined', async () => {
    const { statusCode, data } = await sut.handle({ authorization: undefined as any })

    expect(statusCode).toBe(401)
    expect(data).toEqual(new UnauthorizedError())
  })

  it('Should call authorize with correct values', async () => {
    await sut.handle({ authorization })

    expect(authorize).toHaveBeenCalledWith({ accessToken, role })
    expect(authorize).toHaveBeenCalledTimes(1)
  })

  it('Should return forbidden if authorize return undefined', async () => {
    authorize.mockResolvedValueOnce(undefined)

    const { statusCode, data } = await sut.handle({ authorization })

    expect(statusCode).toBe(403)
    expect(data).toEqual(new ForbiddenError())
  })

  it('Should returns serverError if have any throw', async () => {
    authorize.mockRejectedValueOnce(error)

    const { statusCode, data } = await sut.handle({ authorization })

    expect(statusCode).toBe(500)
    expect(data).toEqual(new ServerError(error))
  })

  it('Should return ok if valid data is provided', async () => {
    const { statusCode, data } = await sut.handle({ authorization })

    expect(statusCode).toBe(200)
    expect(data).toEqual({ accountId })
  })
})
