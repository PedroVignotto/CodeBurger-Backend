import { InvalidFieldError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class Email implements Validator {
  constructor (private readonly email: any, private readonly fieldName: string) {}

  validate (): Error | undefined {
    return new InvalidFieldError(this.fieldName)
  }
}
