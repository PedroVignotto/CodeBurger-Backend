import { forbidden, HttpResponse, ok } from '@/application/helpers'
import { AddAccount, Authentication } from '@/domain/use-cases'

type HttpRequest = { name: string, email: string, password: string, passwordConfirmation: string }
type Model = undefined | Error

export class SignUpController {
  constructor (private readonly addAccount: AddAccount, private readonly authentication: Authentication) {}

  async perform ({ name, email, password }: HttpRequest): Promise<HttpResponse<Model>> {
    const created = await this.addAccount({ name, email, password })

    if (!created) return forbidden()

    await this.authentication({ email, password })

    return ok(undefined)
  }
}
