import { InvalidFieldError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class CompareValidation implements Validator {
  constructor (
    private readonly field: string,
    private readonly fieldToCompare: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (): Error | undefined {
    return new InvalidFieldError(this.fieldToCompareName)
  }
}
