import { TokenGenerator } from '@/domain/contracts/gateways'

import { sign } from 'jsonwebtoken'

export class JwtAdapter implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generate ({ key }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    return sign({ key }, this.secret, { expiresIn: '1d' })
  }
}
