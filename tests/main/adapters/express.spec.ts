import { Controller } from '@/application/controllers'
import { ExpressRouter } from '@/main/adapters'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('ExpressRouterAdapter', () => {
  let sut: ExpressRouter

  let key: string
  let value: string
  let error: string
  let req: Request
  let res: Response

  const controller = mock<Controller>()

  beforeEach(() => {
    sut = new ExpressRouter(controller)

    key = faker.database.column()
    value = faker.random.words()
    error = faker.random.word()
    req = getMockReq({ body: { [key]: value } })
    res = getMockRes().res

    controller.handle.mockResolvedValue({ statusCode: 200, data: { data: value } })
  })

  it('Should call handle with correct request', async () => {
    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({ [key]: value })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('Should call handle with empty request', async () => {
    req = getMockReq()

    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('Should respond with correct statusCode and data on success', async () => {
    await sut.adapt(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ data: value })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('Should respond with correct statusCode and error on failure', async () => {
    controller.handle.mockResolvedValueOnce({ statusCode: 400, data: new Error(error) })

    await sut.adapt(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
