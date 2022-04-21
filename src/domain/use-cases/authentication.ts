import { HashComparer, TokenGenerator } from '@/domain/contracts/gateways'
import { LoadAccountByEmailRepository } from '@/domain/contracts/repositories'

type Setup = (loadAccountByEmailRepository: LoadAccountByEmailRepository, hashComparer: HashComparer, token: TokenGenerator) => Authentication
type Input = { email: string, password: string }
type Output = { name: string, accessToken: string } | undefined
export type Authentication = (input: Input) => Promise<Output>

export const AuthenticationUseCase: Setup = (loadAccountByEmailRepository, hashComparer, token) => async ({ email, password }) => {
  const account = await loadAccountByEmailRepository.loadByEmail({ email })

  if (!account) return undefined

  const isValid = await hashComparer.compare({ plaintext: password, digest: account.password })

  if (!isValid) return undefined

  const accessToken = await token.generate({ key: account.id })

  return { name: account.name, accessToken }
}
