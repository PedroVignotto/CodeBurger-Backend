export class InsuficientPermissionError extends Error {
  constructor () {
    super('Insufficient permission to perform such action')
    this.name = 'InsuficientPermissionError'
  }
}
