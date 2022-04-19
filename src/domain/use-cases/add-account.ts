import { HashGenerator } from '@/domain/contracts/gateways'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/domain/contracts/repositories'

type Setup = (checkAccountByEmailRepository: CheckAccountByEmailRepository, hashGenerator: HashGenerator, addAccountRepository: AddAccountRepository) => AddAccount
type Input = { name: string, email: string, password: string }
type Output = boolean
export type AddAccount = (input: Input) => Promise<Output>

export const setupAddAccount: Setup = (checkAccountByEmailRepository, hashGenerator, addAccountRepository) => async ({ name, email, password }) => {
  const emailExists = await checkAccountByEmailRepository.checkByEmail({ email })

  if (emailExists) return false

  const hashedPassword = await hashGenerator.generate({ plaintext: password })

  await addAccountRepository.create({ name, email, password: hashedPassword })

  return true
}
