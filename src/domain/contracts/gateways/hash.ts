export interface HashGenerator {
  generate: (input: HashGenerator.Input) => Promise<HashGenerator.Output>
}

export namespace HashGenerator {
  export type Input = { plaintext: string }
  export type Output = string
}

export interface HashComparer {
  compare: (input: HashComparer.Input) => Promise<HashComparer.Output>
}

export namespace HashComparer {
  export type Input = { plaintext: string, digest: string }
  export type Output = boolean
}
