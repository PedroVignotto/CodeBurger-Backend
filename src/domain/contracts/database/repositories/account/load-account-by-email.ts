export interface LoadAccountByEmailRepository {
  loadByEmail: (input: LoadAccountByEmailRepository.Input) => Promise<LoadAccountByEmailRepository.Output>
}

export namespace LoadAccountByEmailRepository {
  export type Input = { email: string }
  export type Output = { id: string, name: string, email: string, password: string, createdAt: Date } | undefined
}
