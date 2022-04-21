import { makeFakeDatabase } from '@/tests/infra/repositories/postgres/mocks'
import { Account } from '@/infra/repositories/postgres/entities'
import { AccountRepository } from '@/infra/repositories/postgres/repositories'

import { IBackup, IMemoryDb } from 'pg-mem'
import faker from 'faker'
import { getRepository, Repository } from 'typeorm'

describe('AccountRepository', () => {
  let sut: AccountRepository
  let id: string
  let name: string
  let email: string
  let password: string
  let backup: IBackup
  let database: IMemoryDb
  let repository: Repository<Account>

  beforeAll(async () => {
    id = faker.datatype.uuid()
    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password(8)

    database = await makeFakeDatabase([Account])
    backup = database.backup()
    repository = getRepository(Account)
  })

  beforeEach(() => {
    backup.restore()

    sut = new AccountRepository()
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
