import { CompareValidation, EmailValidation, RequiredValidation, Validator } from '@/application/validation'

export class ValidationBuilder {
  private constructor (
    private readonly value: any,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (value: any, fieldName: string): ValidationBuilder {
    return new ValidationBuilder(value, fieldName)
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredValidation(this.value, this.fieldName))

    return this
  }

  email (): ValidationBuilder {
    this.validators.push(new EmailValidation(this.value, this.fieldName))

    return this
  }

  sameAs (fieldToCompare: string): ValidationBuilder {
    this.validators.push(new CompareValidation(this.value, fieldToCompare, this.fieldName))

    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
