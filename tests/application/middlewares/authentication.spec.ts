import { ForbiddenError, UnauthorizedError } from '@/application/errors'
import { AuthenticationMiddleware } from '@/application/middlewares'

import faker from 'faker'

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware

  let role: string
  let accessToken: string
  let Authorization: string

  const authorize: jest.Mock = jest.fn()

  beforeAll(() => {
    role = faker.random.word()
  })

  beforeEach(() => {
    sut = new AuthenticationMiddleware(authorize, role)

    accessToken = faker.datatype.uuid()
    Authorization = `Bearer ${accessToken}`

    authorize.mockResolvedValue({ accessToken })
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
})
