export interface TokenGenerator {
  generate: (input: TokenGenerator.Input) => Promise<TokenGenerator.Output>
}

export namespace TokenGenerator {
  export type Input = { key: string }
  export type Output = string
}
