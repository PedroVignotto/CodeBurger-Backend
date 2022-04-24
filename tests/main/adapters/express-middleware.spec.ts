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

  let req: Request
  let res: Response
  let next: NextFunction

  const middleware = mock<Middleware>()

  beforeEach(() => {
    sut = expressMiddlewareAdapter(middleware)

    key = faker.database.column()
    value = faker.random.words()
    req = getMockReq({ headers: { [key]: value } })
    res = getMockRes().res
    next = getMockRes().next
  })

  it('Should call handle with correct values', async () => {
    await sut(req, res, next)

    expect(middleware.handle).toHaveBeenCalledWith({ [key]: value })
    expect(middleware.handle).toHaveBeenCalledTimes(1)
  })
})
