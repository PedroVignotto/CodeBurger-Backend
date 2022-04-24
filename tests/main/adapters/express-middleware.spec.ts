import { Middleware } from '@/application/middlewares'
import { expressMiddlewareAdapter } from '@/main/adapters'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('ExpressMidlewareAdapter', () => {
  let sut: RequestHandler

  let key: string
  let value: string
  let error: string
  let req: Request
  let res: Response
  let next: NextFunction

  const middleware = mock<Middleware>()

  beforeEach(() => {
    sut = expressMiddlewareAdapter(middleware)

    key = faker.database.column()
    value = faker.random.words()
    error = faker.random.word()
    req = getMockReq({ headers: { [key]: value } })
    res = getMockRes().res
    next = getMockRes().next

    middleware.handle.mockResolvedValue({ statusCode: 500, data: new Error(error) })
  })

  it('Should call handle with correct values', async () => {
    await sut(req, res, next)

    expect(middleware.handle).toHaveBeenCalledWith({ [key]: value })
    expect(middleware.handle).toHaveBeenCalledTimes(1)
  })

  it('Should call handle with empty value', async () => {
    req = getMockReq()

    await sut(req, res, next)

    expect(middleware.handle).toHaveBeenCalledWith({})
    expect(middleware.handle).toHaveBeenCalledTimes(1)
  })

  it('Should respond with correct statusCode and error on failure', async () => {
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
