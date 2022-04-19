import { forbidden, HttpResponse, created, unauthorized } from '@/application/helpers'
import { AddAccount, Authentication } from '@/domain/use-cases'

type HttpRequest = { name: string, email: string, password: string, passwordConfirmation: string }
type Model = { name: string, accessToken: string } | Error

export class SignUpController {
  constructor (private readonly addAccount: AddAccount, private readonly authentication: Authentication) {}

  async perform ({ name, email, password }: HttpRequest): Promise<HttpResponse<Model>> {
    const account = await this.addAccount({ name, email, password })

    if (!account) return forbidden()

    const data = await this.authentication({ email, password })

    if (!data) return unauthorized()

    return created(data)
  }
}
