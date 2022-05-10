import { Controller } from '@/application/controllers/controller'
import { HttpResponse, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { Authentication } from '@/domain/use-cases/account'

type HttpRequest = { email: string, password: string }
type Model = { name: string, accessToken: string }

export class LoginController extends Controller {
  constructor (private readonly authentication: Authentication) { super() }

  async perform ({ email, password }: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.authentication({ email, password })

    return ok(data)
  }

  override buildValidators ({ email, password }: HttpRequest): Validator[] {
    return [
      ...Builder.of(email, 'email').required().email().build(),
      ...Builder.of(password, 'password').required().build()
    ]
  }
}
