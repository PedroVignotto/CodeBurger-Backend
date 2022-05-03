import { Account } from '@/infra/database/postgres/entities'
import { PgRepository } from '@/infra/database/postgres/repositories'
import { UUIDGenerator } from '@/domain/contracts/gateways'
import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, CheckAccountRole } from '@/domain/contracts/database/repositories/account'

type Setup = CheckAccountByEmailRepository & AddAccountRepository & LoadAccountByEmailRepository & CheckAccountRole

export class AccountRepository extends PgRepository implements Setup {
  constructor (private readonly uuid: UUIDGenerator) { super() }

  async checkByEmail ({ email }: CheckAccountByEmailRepository.Input): Promise<CheckAccountByEmailRepository.Output> {
    const repository = this.getRepository(Account)

    return !!await repository.findOne({ email })
  }

  async create ({ name, email, password }: AddAccountRepository.Input): Promise<AddAccountRepository.Output> {
    const repository = this.getRepository(Account)

    await repository.save({ id: this.uuid.generate(), name, email, password })
  }

  async loadByEmail ({ email }: LoadAccountByEmailRepository.Input): Promise<LoadAccountByEmailRepository.Output> {
    const repository = this.getRepository(Account)

    return await repository.findOne({ email })
  }

  async checkRole ({ accountId, role }: CheckAccountRole.Input): Promise<CheckAccountRole.Output> {
    const repository = this.getRepository(Account)

    return !!await repository.findOne({ where: [{ id: accountId, role: role ?? null }, { id: accountId, role: 'admin' }] })
  }
}
