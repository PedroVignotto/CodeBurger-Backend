import { Account } from '@/infra/database/postgres/entities'
import { PgRepository } from '@/infra/database/postgres/repositories'
import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, CheckAccountRole } from '@/domain/contracts/database/repositories/account'
import { UUIDGenerator } from '@/domain/contracts/gateways'

export class AccountRepository extends PgRepository implements CheckAccountByEmailRepository, AddAccountRepository, LoadAccountByEmailRepository, CheckAccountRole {
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

  async loadByEmail ({ email }: LoadAccountByEmailRepository.Input): Promise<LoadAccountByEmailRepository.Output> {
    const repository = this.getRepository(Account)

    const account = await repository.findOne({ email })

    return account
  }

  async checkRole ({ accountId, role }: CheckAccountRole.Input): Promise<CheckAccountRole.Output> {
    const repository = this.getRepository(Account)

    const account = await repository.findOne({ where: { id: accountId, role: role ?? null } })

    return !!account
  }
}
