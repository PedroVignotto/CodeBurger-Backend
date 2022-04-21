import { UUIDGenerator } from '@/domain/contracts/gateways'
import { UuidAdapter } from '@/infra/gateways'

export const makeUUIDAdapter = (): UUIDGenerator => {
  return new UuidAdapter()
}
