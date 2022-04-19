import { forbidden, HttpResponse, ok } from '@/application/helpers'
import { AddAccount } from '@/domain/use-cases'

type HttpRequest = { name: string, email: string, password: string, passwordConfirmation: string }
type Model = undefined | Error

export class SignUpController {
  constructor (private readonly addAccount: AddAccount) {}

  async perform ({ name, email, password }: HttpRequest): Promise<HttpResponse<Model>> {
    const created = await this.addAccount({ name, email, password })

    if (!created) return forbidden()

    return ok(undefined)
  }
}
