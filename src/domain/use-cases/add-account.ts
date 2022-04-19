import { CheckAccountByEmailRepository } from '@/domain/contracts/repositories'

type Setup = (checkAccountByEmailRepository: CheckAccountByEmailRepository) => AddAccount
type Input = { email: string }
type Output = undefined
export type AddAccount = (input: Input) => Promise<Output>

export const setupAddAccount: Setup = checkAccountByEmailRepository => async ({ email }) => {
  const emailExists = await checkAccountByEmailRepository.checkByEmail({ email })

  if (emailExists) return undefined
}
