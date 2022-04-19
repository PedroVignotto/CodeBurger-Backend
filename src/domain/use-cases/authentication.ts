import { LoadAccountByEmailRepository } from '@/domain/contracts/repositories'

type Setup = (loadAccountByEmailRepository: LoadAccountByEmailRepository) => Authentication
type Input = { email: string }
type Output = undefined
export type Authentication = (input: Input) => Promise<Output>

export const setupAuthentication: Setup = loadAccountByEmailRepository => async ({ email }) => {
  await loadAccountByEmailRepository.loadByEmail({ email })

  return undefined
}
