import { UUIDGenerator } from '@/domain/contracts/gateways'
import { UUIDAdapter } from '@/infra/gateways'

export const makeUUIDAdapter = (): UUIDGenerator => {
  return new UUIDAdapter()
}
