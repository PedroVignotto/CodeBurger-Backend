import { HashComparer } from '@/domain/contracts/gateways'
import { LoadAccountByEmailRepository } from '@/domain/contracts/repositories'

type Setup = (loadAccountByEmailRepository: LoadAccountByEmailRepository, hashComparer: HashComparer) => Authentication
type Input = { email: string, password: string }
type Output = undefined
export type Authentication = (input: Input) => Promise<Output>

export const setupAuthentication: Setup = (loadAccountByEmailRepository, hashComparer) => async ({ email, password }) => {
  const account = await loadAccountByEmailRepository.loadByEmail({ email })

  if (!account) return undefined

  const isValid = await hashComparer.compare({ plaintext: password, digest: account.password })

  if (!isValid) return undefined
}
