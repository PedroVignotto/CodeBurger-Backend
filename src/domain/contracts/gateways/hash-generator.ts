export interface HashGenerator {
  generator: (input: HashGenerator.Input) => Promise<HashGenerator.Output>
}

export namespace HashGenerator {
  export type Input = { plaintext: string }
  export type Output = string
}
