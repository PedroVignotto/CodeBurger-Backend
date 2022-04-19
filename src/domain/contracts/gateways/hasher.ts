export interface Hasher {
  hash: (input: Hasher.Input) => Promise<Hasher.Output>
}

export namespace Hasher {
  export type Input = { plaintext: string }
  export type Output = string
}
