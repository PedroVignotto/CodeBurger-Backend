import { Hasher } from '@/domain/contracts/gateways'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/domain/contracts/repositories'

type Setup = (checkAccountByEmailRepository: CheckAccountByEmailRepository, hasher: Hasher, addAccountRepository: AddAccountRepository) => AddAccount
type Input = { name: string, email: string, password: string }
type Output = undefined
export type AddAccount = (input: Input) => Promise<Output>

export const setupAddAccount: Setup = (checkAccountByEmailRepository, hasher, addAccountRepository) => async ({ name, email, password }) => {
  const emailExists = await checkAccountByEmailRepository.checkByEmail({ email })

  if (emailExists) return undefined

  const hashedPassword = await hasher.hash({ plaintext: password })

  await addAccountRepository.create({ name, email, password: hashedPassword })
}
