export class FieldNotFoundError extends Error {
  constructor (fieldName: string) {
    super(`The received ${fieldName} not found`)
    this.name = 'FieldNotFoundError'
  }
}
