import { makeFakeDatabase } from '@/tests/infra/repositories/postgres/mocks'
import { Account } from '@/infra/repositories/postgres/entities'
import { AccountRepository } from '@/infra/repositories/postgres/repositories'

import { IBackup, IMemoryDb } from 'pg-mem'
import faker from 'faker'

describe('AccountRepository', () => {
  let sut: AccountRepository
  let email: string
  let backup: IBackup
  let database: IMemoryDb

  beforeAll(async () => {
    email = faker.internet.email()

    database = await makeFakeDatabase([Account])

    backup = database.backup()
  })

  beforeEach(() => {
    backup.restore()

    sut = new AccountRepository()
  })

  it('Should return false if email does not exists', async () => {
    const emailExists = await sut.checkByEmail({ email })

    expect(emailExists).toBe(false)
  })
})
