import { HashComparer, TokenGenerator } from '@/domain/contracts/gateways'
import { LoadAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'

type Setup = (accountRepository: LoadAccountByEmailRepository, hashComparer: HashComparer, token: TokenGenerator) => Authentication
type Input = { email: string, password: string }
type Output = { name: string, accessToken: string } | undefined
export type Authentication = (input: Input) => Promise<Output>

export const AuthenticationUseCase: Setup = (accountRepository, hashComparer, token) => async ({ email, password }) => {
  const account = await accountRepository.loadByEmail({ email })

  if (!account) return undefined

  const isValid = await hashComparer.compare({ plaintext: password, digest: account.password })

  if (!isValid) return undefined

  const accessToken = await token.generate({ key: account.id })

  return { name: account.name, accessToken }
}
