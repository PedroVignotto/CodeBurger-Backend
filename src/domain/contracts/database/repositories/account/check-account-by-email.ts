export interface CheckAccountByEmailRepository {
  checkByEmail: (input: CheckAccountByEmailRepository.Input) => Promise<CheckAccountByEmailRepository.Output>
}

export namespace CheckAccountByEmailRepository {
  export type Input = { email: string }
  export type Output = boolean
}
