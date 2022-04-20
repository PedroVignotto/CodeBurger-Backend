import { InvalidFieldError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class CompareValidation implements Validator {
  constructor (
    private readonly field: string,
    private readonly fieldToCompare: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (): Error | undefined {
    if (this.field !== this.fieldToCompare) {
      return new InvalidFieldError(this.fieldToCompareName)
    }
  }
}
