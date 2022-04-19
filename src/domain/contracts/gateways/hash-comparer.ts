export interface HashComparer {
  compare: (input: HashComparer.Input) => Promise<HashComparer.Output>
}

export namespace HashComparer {
  export type Input = { plaintext: string, digest: string }
  export type Output = boolean
}
