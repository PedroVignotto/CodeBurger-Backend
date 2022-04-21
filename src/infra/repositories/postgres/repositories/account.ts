import { Account } from '@/infra/repositories/postgres/entities'
import { CheckAccountByEmailRepository } from '@/domain/contracts/repositories'

import { getRepository } from 'typeorm'

export class AccountRepository implements CheckAccountByEmailRepository {
  async checkByEmail ({ email }: CheckAccountByEmailRepository.Input): Promise<CheckAccountByEmailRepository.Output> {
    const repository = getRepository(Account)

    const emailExists = await repository.findOne({ email })

    return !!emailExists
  }
}
