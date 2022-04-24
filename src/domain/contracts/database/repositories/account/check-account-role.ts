export interface CheckAccountRole {
  checkRole: (input: CheckAccountRole.Input) => Promise<CheckAccountRole.Output>
}

export namespace CheckAccountRole {
  export type Input = { accountId: string, role?: string }
  export type Output = boolean
}
