import { env } from '@/main/config'
import { TokenGenerator, TokenValidator } from '@/domain/contracts/gateways'
import { JwtAdapter } from '@/infra/gateways'

export const makeTokenAdapter = (): TokenGenerator & TokenValidator => {
  return new JwtAdapter(env.secret)
}
