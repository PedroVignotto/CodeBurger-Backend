import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { Authorize } from '@/domain/use-cases/account'

type HttpRequest = { Authorization: string }
type Model = Error | undefined

export class AuthenticationMiddleware {
  constructor (private readonly authorize: Authorize, private readonly role?: string) {}

  async handle ({ Authorization }: HttpRequest): Promise<HttpResponse<Model>> {
    if (!Authorization) return unauthorized()

    const [, accessToken] = Authorization.split(' ')

    await this.authorize({ accessToken, role: this.role })

    return ok(undefined)
  }
}
