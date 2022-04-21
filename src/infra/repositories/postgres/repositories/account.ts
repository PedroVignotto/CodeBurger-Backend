import { Account } from '@/infra/repositories/postgres/entities'
import { PgRepository } from '@/infra/repositories/postgres/repositories'
import { CheckAccountByEmailRepository } from '@/domain/contracts/repositories'

export class AccountRepository extends PgRepository implements CheckAccountByEmailRepository {
  async checkByEmail ({ email }: CheckAccountByEmailRepository.Input): Promise<CheckAccountByEmailRepository.Output> {
    const repository = this.getRepository(Account)

    const emailExists = await repository.findOne({ email })

    return !!emailExists
  }
}
