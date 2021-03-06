import { HashGenerator } from '@/domain/contracts/gateways'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'
import { FieldInUseError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountByEmailRepository & AddAccountRepository, hashGenerator: HashGenerator) => AddAccount
type Input = { name: string, email: string, password: string }
type Output = void
export type AddAccount = (input: Input) => Promise<Output>

export const addAccountUseCase: Setup = (accountRepository, hashGenerator) => async ({ name, email, password }) => {
  const emailExists = await accountRepository.checkByEmail({ email })

  if (emailExists) throw new FieldInUseError('email')

  const hashedPassword = await hashGenerator.generate({ plaintext: password })

  await accountRepository.create({ name, email, password: hashedPassword })
}
