import { Controller } from '@/application/controllers/controller'
import { forbidden, HttpResponse, created } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { AddAccount, Authentication } from '@/domain/use-cases/account'

type HttpRequest = { name: string, email: string, password: string, passwordConfirmation: string }
type Model = { name: string, accessToken: string } | Error

export class SignUpController extends Controller {
  constructor (private readonly addAccount: AddAccount, private readonly authentication: Authentication) { super() }

  async perform ({ name, email, password }: HttpRequest): Promise<HttpResponse<Model>> {
    const account = await this.addAccount({ name, email, password })

    if (!account) return forbidden()

    const data = await this.authentication({ email, password })

    return created(data!)
  }

  override buildValidators ({ name, email, password, passwordConfirmation }: HttpRequest): Validator[] {
    return [
      ...Builder.of(name, 'name').required().build(),
      ...Builder.of(email, 'email').required().email().build(),
      ...Builder.of(password, 'password').required().build(),
      ...Builder.of(passwordConfirmation, 'passwordConfirmation').required().sameAs(password).build()
    ]
  }
}
