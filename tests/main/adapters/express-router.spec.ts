import { Controller } from '@/application/controllers'
import { expressRouterAdapter } from '@/main/adapters'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('ExpressRouterAdapter', () => {
  let sut: RequestHandler

  let key: string
  let value: string
  let error: string
  let req: Request
  let res: Response
  let next: NextFunction

  const controller = mock<Controller>()

  beforeAll(() => {
    key = faker.database.column()
    value = faker.random.words()
    error = faker.random.word()

    controller.handle.mockResolvedValue({ statusCode: 200, data: { data: value } })
  })

  beforeEach(() => {
    sut = expressRouterAdapter(controller)

    req = getMockReq({ body: { [key]: value } })
    res = getMockRes().res
    next = getMockRes().next
  })

  it('Should call handle with correct request', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ [key]: value })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('Should call handle with empty request', async () => {
    req = getMockReq()

    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('Should respond with correct statusCode and data on success', async () => {
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ data: value })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('Should respond with correct statusCode and error on failure', async () => {
    controller.handle.mockResolvedValueOnce({ statusCode: 400, data: new Error(error) })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
