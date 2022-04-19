import { InvalidFieldError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class Email implements Validator {
  constructor (private readonly email: string, private readonly fieldName: string) {}

  validate (): Error | undefined {
    return this.email ? new InvalidFieldError(this.fieldName) : undefined
  }
}
