import { InvalidFieldError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class EmailValidation implements Validator {
  constructor (private readonly email: string, private readonly fieldName: string) {}

  validate (): Error | undefined {
    const validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    if (this.email && !validEmail.test(this.email)) return new InvalidFieldError(this.fieldName)
  }
}
