import { forbidden, HttpResponse, created, unauthorized, badRequest } from '@/application/helpers'
import { ValidationBuilder as Builder, ValidationComposite } from '@/application/validation'
import { AddAccount, Authentication } from '@/domain/use-cases'

type HttpRequest = { name: string, email: string, password: string, passwordConfirmation: string }
type Model = { name: string, accessToken: string } | Error

export class SignUpController {
  constructor (private readonly addAccount: AddAccount, private readonly authentication: Authentication) {}

  async perform ({ name, email, password, passwordConfirmation }: HttpRequest): Promise<HttpResponse<Model>> {
    const error = this.validate({ name, email, password, passwordConfirmation })

    if (error) return badRequest(error)

    const account = await this.addAccount({ name, email, password })

    if (!account) return forbidden()

    const data = await this.authentication({ email, password })

    if (!data) return unauthorized()

    return created(data)
  }

  private validate ({ name, email, password, passwordConfirmation }: HttpRequest): Error | undefined {
    return new ValidationComposite([
      ...Builder.of(name, 'name').required().build(),
      ...Builder.of(email, 'email').required().build(),
      ...Builder.of(password, 'password').required().build(),
      ...Builder.of(passwordConfirmation, 'passwordConfirmation').required().build()
    ]).validate()
  }
}
