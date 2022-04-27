export class RequiredFieldError extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} is required`)
    this.name = 'RequiredFieldError'
  }
}

export class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`Invalid field: ${fieldName}`)
    this.name = 'InvalidFieldError'
  }
}

export class FieldInUseError extends Error {
  constructor (fieldName: string) {
    super(`The received ${fieldName} is already in use`)
    this.name = 'FieldInUseError'
  }
}
