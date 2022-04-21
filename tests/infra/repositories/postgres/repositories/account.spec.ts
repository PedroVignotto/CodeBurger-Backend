import { makeFakeDatabase } from '@/tests/infra/repositories/postgres/mocks'
import { AccountRepository, PgRepository } from '@/infra/repositories/postgres/repositories'
import { PgConnection } from '@/infra/repositories/postgres/helpers'
import { Account } from '@/infra/repositories/postgres/entities'

import { IBackup, IMemoryDb } from 'pg-mem'
import faker from 'faker'
import { Repository } from 'typeorm'

describe('AccountRepository', () => {
  let sut: AccountRepository

  let id: string
  let name: string
  let email: string
  let password: string

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
  let repository: Repository<Account>

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Account])
    backup = database.backup()
    repository = connection.getRepository(Account)
  })

  beforeEach(() => {
    backup.restore()

    sut = new AccountRepository()

    id = faker.datatype.uuid()
    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password(8)
  })

  it('Should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  it('Should return false if email does not exists', async () => {
    const emailExists = await sut.checkByEmail({ email })

    expect(emailExists).toBe(false)
  })

  it('Should return true if email already exists', async () => {
    await repository.save({ id, name, email, password })

    const emailExists = await sut.checkByEmail({ email })

    expect(emailExists).toBe(true)
  })
})
