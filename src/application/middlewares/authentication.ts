import { forbidden, HttpResponse, ok, serverError, unauthorized } from '@/application/helpers'
import { Authorize } from '@/domain/use-cases/account'

type HttpRequest = { Authorization: string }
type Model = { accountId: string } | Error

export class AuthenticationMiddleware {
  constructor (private readonly authorize: Authorize, private readonly role?: string) {}

  async handle ({ Authorization }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (!Authorization) return unauthorized()

      const [, accessToken] = Authorization.split(' ')

      const accountId = await this.authorize({ accessToken, role: this.role })

      if (!accountId) return forbidden()

      return ok(accountId)
    } catch (error) {
      return serverError(error)
    }
  }
}
