import { multerAdapter } from '@/main/adapters'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { RequestHandler, Request, Response, NextFunction } from 'express'
import { mocked } from 'jest-mock'
import multer from 'multer'

jest.mock('multer')

describe('MulterAdapter', () => {
  let sut: RequestHandler

  let req: Request
  let res: Response
  let next: NextFunction

  const fakeMulter = multer as jest.Mocked<typeof multer>

  const uploadSpy: jest.Mock = jest.fn()
  const singleSpy: jest.Mock = jest.fn()
  const multerSpy: jest.Mock = jest.fn()

  beforeAll(() => {
    req = getMockReq()
    res = getMockRes().res
    next = getMockRes().next

    singleSpy.mockImplementation(() => uploadSpy)
    multerSpy.mockImplementation(() => ({ single: singleSpy }))
    mocked(fakeMulter).mockImplementation(multerSpy)
  })

  beforeEach(() => {
    sut = multerAdapter
  })

  it('Should call single upload with correct values', () => {
    sut(req, res, next)

    expect(multerSpy).toHaveBeenCalledWith()
    expect(multerSpy).toHaveBeenCalledTimes(1)
    expect(singleSpy).toHaveBeenCalledWith('picture')
    expect(singleSpy).toHaveBeenCalledTimes(1)
    expect(uploadSpy).toHaveBeenCalledWith(req, res, expect.any(Function))
    expect(uploadSpy).toHaveBeenCalledTimes(1)
  })
})
