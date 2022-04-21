import { UUIDGenerator } from '@/domain/contracts/gateways'

import { v4 as uuidV4 } from 'uuid'

export class UuidAdapter implements UUIDGenerator {
  generate (): UUIDGenerator.Output {
    return uuidV4()
  }
}
