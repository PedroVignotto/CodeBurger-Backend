export class NonExistentFieldError extends Error {
  constructor (fieldName: string) {
    super(`The received ${fieldName} does not exists`)
    this.name = 'NonExistentFieldError'
  }
}
