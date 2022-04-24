import { TokenGenerator, TokenValidator } from '@/domain/contracts/gateways'

import { sign, verify } from 'jsonwebtoken'

export class JwtAdapter implements TokenGenerator, TokenValidator {
  constructor (private readonly secret: string) {}

  async generate ({ key }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    return sign({ key }, this.secret, { expiresIn: '1d' })
  }

  async validate ({ token }: TokenValidator.Input): Promise<TokenValidator.Output> {
    return verify(token, this.secret) as any
  }
}
