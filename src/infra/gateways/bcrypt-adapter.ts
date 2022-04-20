import { HashComparer, HashGenerator } from '@/domain/contracts/gateways'

import bcrypt from 'bcryptjs'

export class BCryptAdapter implements HashGenerator, HashComparer {
  async generate ({ plaintext }: HashGenerator.Input): Promise<HashGenerator.Output> {
    return bcrypt.hash(plaintext, 12)
  }

  async compare ({ plaintext, digest }: HashComparer.Input): Promise<HashComparer.Output> {
    return bcrypt.compare(plaintext, digest)
  }
}
