import { UUIDGenerator } from '@/domain/contracts/gateways'

import { v4 as uuid } from 'uuid'

export class UuidAdapter implements UUIDGenerator {
  generate (): UUIDGenerator.Output {
    return uuid()
  }
}
