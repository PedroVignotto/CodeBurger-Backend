import { badRequest, HttpResponse, serverError, unauthorized } from '@/application/helpers'
import { ValidationComposite, Validator } from '@/application/validation'
import { AuthenticationError, FieldInUseError, FieldNotFoundError, NonExistentFieldError } from '@/domain/errors'

export abstract class Controller {
  abstract perform (httpRequest?: any): Promise<HttpResponse>

  buildValidators (httpRequest?: any): Validator[] { return [] }

  async handle (httpRequest?: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest)

    if (error) return badRequest(error)

    try {
      return await this.perform(httpRequest)
    } catch (error) {
      if (error instanceof FieldInUseError || error instanceof NonExistentFieldError || error instanceof FieldNotFoundError) return badRequest(error)
      if (error instanceof AuthenticationError) return unauthorized()

      return serverError(error)
    }
  }

  private validate (httpRequest?: any): Error | undefined {
    return new ValidationComposite(this.buildValidators(httpRequest)).validate()
  }
}
