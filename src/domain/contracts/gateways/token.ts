export interface TokenGenerator {
  generate: (input: TokenGenerator.Input) => Promise<TokenGenerator.Output>
}

export namespace TokenGenerator {
  export type Input = { key: string }
  export type Output = string
}

export interface TokenValidator {
  validate: (input: TokenValidator.Input) => Promise<void>
}

export namespace TokenValidator {
  export type Input = { token: string }
}
