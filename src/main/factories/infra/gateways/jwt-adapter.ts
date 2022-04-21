import { env } from '@/main/config'
import { TokenGenerator } from '@/domain/contracts/gateways'
import { JwtAdapter } from '@/infra/gateways'

export const makeTokenAdapter = (): TokenGenerator => {
  return new JwtAdapter(env.secret)
}
