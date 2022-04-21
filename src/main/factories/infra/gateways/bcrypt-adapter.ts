import { HashComparer, HashGenerator } from '@/domain/contracts/gateways'
import { BCryptAdapter } from '@/infra/gateways'

export const makeHashAdapter = (): HashGenerator & HashComparer => {
  return new BCryptAdapter()
}
