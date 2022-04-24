import { CheckAccountRole } from '@/domain/contracts/database/repositories/account/check-account-role'
import { TokenValidator } from '@/domain/contracts/gateways'

type Setup = (token: TokenValidator, accountRepository: CheckAccountRole) => Authorize
type Input = { accessToken: string, role?: string }
type Output = string
export type Authorize = (input: Input) => Promise<Output>

export const AuthorizeUseCase: Setup = (token, accountRepository) => async ({ accessToken, role }) => {
  const accountId = await token.validate({ token: accessToken })

  await accountRepository.checkRole({ accountId, role })

  return accountId
}
