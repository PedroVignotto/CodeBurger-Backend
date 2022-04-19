import { RequiredFieldError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class Required implements Validator {
  constructor (private readonly value: any, private readonly fieldName: string) {}

  validate (): Error | undefined {
    if (!this.value) return new RequiredFieldError(this.fieldName)
  }
}
