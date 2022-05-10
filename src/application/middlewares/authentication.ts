import { forbidden, HttpResponse, ok, serverError, unauthorized } from '@/application/helpers'
import { Middleware } from '@/application/middlewares/middleware'
import { AuthenticationError, InsuficientPermissionError } from '@/domain/errors'
import { Authorize } from '@/domain/use-cases/account'

type HttpRequest = { authorization: string }
type Model = { accountId: string } | Error

export class AuthenticationMiddleware implements Middleware {
  constructor (private readonly authorize: Authorize, private readonly role?: string) {}

  async handle ({ authorization }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (!authorization) return unauthorized()

      const [, accessToken] = authorization.split(' ')

      const accountId = await this.authorize({ accessToken, role: this.role })

      return ok(accountId)
    } catch (error) {
      if (error instanceof AuthenticationError) return unauthorized()
      if (error instanceof InsuficientPermissionError) return forbidden()

      return serverError(error)
    }
  }
}
