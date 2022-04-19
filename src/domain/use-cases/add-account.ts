import { Hasher } from '@/domain/contracts/gateways'
import { CheckAccountByEmailRepository } from '@/domain/contracts/repositories'

type Setup = (checkAccountByEmailRepository: CheckAccountByEmailRepository, hasher: Hasher) => AddAccount
type Input = { email: string, password: string }
type Output = undefined
export type AddAccount = (input: Input) => Promise<Output>

export const setupAddAccount: Setup = (checkAccountByEmailRepository, hasher) => async ({ email, password }) => {
  const emailExists = await checkAccountByEmailRepository.checkByEmail({ email })

  if (emailExists) return undefined

  await hasher.hash({ plaintext: password })
}
