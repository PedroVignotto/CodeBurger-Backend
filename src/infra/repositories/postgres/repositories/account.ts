import { Account } from '@/infra/repositories/postgres/entities'
import { PgRepository } from '@/infra/repositories/postgres/repositories'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/domain/contracts/repositories'
import { UUIDGenerator } from '@/domain/contracts/gateways'

export class AccountRepository extends PgRepository implements CheckAccountByEmailRepository, AddAccountRepository {
  constructor (private readonly uuid: UUIDGenerator) { super() }

  async checkByEmail ({ email }: CheckAccountByEmailRepository.Input): Promise<CheckAccountByEmailRepository.Output> {
    const repository = this.getRepository(Account)

    const emailExists = await repository.findOne({ email })

    return !!emailExists
  }

  async create ({ name, email, password }: AddAccountRepository.Input): Promise<AddAccountRepository.Output> {
    const repository = this.getRepository(Account)

    const account = await repository.save({ id: this.uuid.generate(), name, email, password })

    return account
  }
}
