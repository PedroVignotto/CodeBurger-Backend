import { CheckAccountRole } from '@/domain/contracts/database/repositories/account/check-account-role'
import { TokenValidator } from '@/domain/contracts/gateways'
import { AuthenticationError, InsuficientPermissionError } from '@/domain/errors'

type Setup = (token: TokenValidator, accountRepository: CheckAccountRole) => Authorize
type Input = { accessToken: string, role?: string }
type Output = { accountId: string }
export type Authorize = (input: Input) => Promise<Output>

export const authorizeUseCase: Setup = (token, accountRepository) => async ({ accessToken, role }) => {
  let accountId: string

  try {
    accountId = await token.validate({ token: accessToken })
  } catch { throw new AuthenticationError() }

  const account = await accountRepository.checkRole({ accountId, role })

  if (!account) throw new InsuficientPermissionError()

  return { accountId }
}
