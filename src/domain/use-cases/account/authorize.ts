import { TokenValidator } from '@/domain/contracts/gateways'

type Setup = (token: TokenValidator) => Authorize
type Input = { accessToken: string }
type Output = string
export type Authorize = (input: Input) => Promise<Output>

export const AuthorizeUseCase: Setup = token => async ({ accessToken }) => {
  return token.validate({ token: accessToken })
}
