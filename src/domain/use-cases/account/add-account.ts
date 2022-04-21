import { HashGenerator } from '@/domain/contracts/gateways'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'

type Setup = (accountRepository: CheckAccountByEmailRepository & AddAccountRepository, hashGenerator: HashGenerator) => AddAccount
type Input = { name: string, email: string, password: string }
type Output = boolean
export type AddAccount = (input: Input) => Promise<Output>

export const AddAccountUseCase: Setup = (accountRepository, hashGenerator) => async ({ name, email, password }) => {
  const emailExists = await accountRepository.checkByEmail({ email })

  if (emailExists) return false

  const hashedPassword = await hashGenerator.generate({ plaintext: password })

  await accountRepository.create({ name, email, password: hashedPassword })

  return true
}
