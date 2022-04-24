import { HttpResponse, unauthorized } from '@/application/helpers'

type HttpRequest = { authorization: string }

export class AuthenticationMiddleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Error>> {
    return unauthorized()
  }
}
