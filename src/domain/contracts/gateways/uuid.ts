export interface UUIDGenerator {
  generate: () => UUIDGenerator.Output
}

export namespace UUIDGenerator {
  export type Output = string
}
