export class ValueNotExpectedError extends Error {
  constructor (fieldName: string) {
    super(`The received ${fieldName} not as expected`)
    this.name = 'ValueNotExpectedError'
  }
}
