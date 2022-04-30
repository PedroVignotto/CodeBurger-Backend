export class FieldInUseError extends Error {
  constructor (fieldName: string) {
    super(`The received ${fieldName} is already in use`)
    this.name = 'FieldInUseError'
  }
}
