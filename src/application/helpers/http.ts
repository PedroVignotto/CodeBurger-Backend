import { ForbiddenError, ServerError } from '@/application/errors'

export type HttpResponse<T = any> = { statusCode: number, data: T }

export const created = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 201,
  data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const forbidden = (): HttpResponse<Error> => ({
  statusCode: 403,
  data: new ForbiddenError()
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined)
})
