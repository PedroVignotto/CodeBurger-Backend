import { Controller } from '@/application/controllers'
import { ServerError } from '@/application/errors'
import { HttpResponse } from '@/application/helpers'
import { ValidationComposite } from '@/application/validation'

import { mocked } from 'jest-mock'
import faker from 'faker'

jest.mock('@/application/validation/composite')

class ControllerStub extends Controller {
  result: HttpResponse = { statusCode: 200, data: faker.random.objectElement() }

  async perform (httpRequest: any): Promise<HttpResponse> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerStub

  let value: any
  let errorObject: Error
  let error: string

  beforeAll(() => {
    value = faker.random.word()
    errorObject = new Error(faker.random.word())
    error = faker.random.word()
  })

  beforeEach(() => {
    sut = new ControllerStub()
  })

  it('Should return badRequest if any validation fails', async () => {
    mocked(ValidationComposite).mockImplementationOnce(
      jest.fn().mockImplementationOnce(() => ({ validate: jest.fn().mockReturnValueOnce(errorObject) }))
    )

    const { statusCode, data } = await sut.handle(value)

    expect(ValidationComposite).toHaveBeenCalledWith([])
    expect(statusCode).toBe(400)
    expect(data).toEqual(errorObject)
  })

  it('Should return serverError if perform throw', async () => {
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(errorObject)

    const { statusCode, data } = await sut.handle(value)

    expect(statusCode).toBe(500)
    expect(data).toEqual(new ServerError(errorObject))
  })

  it('Should return serverError if perform throw a non error object', async () => {
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)

    const { statusCode, data } = await sut.handle(faker.random.word())

    expect(statusCode).toBe(500)
    expect(data).toEqual(new ServerError())
  })

  it('Should return same result as perform', async () => {
    const httpResponse = await sut.handle(value)

    expect(httpResponse).toEqual(sut.result)
  })
})
