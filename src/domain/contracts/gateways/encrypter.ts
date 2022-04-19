export interface Encrypter {
  encrypt: (input: Encrypter.Input) => Promise<Encrypter.Output>
}

export namespace Encrypter {
  export type Input = { plaintext: string }
  export type Output = string
}
