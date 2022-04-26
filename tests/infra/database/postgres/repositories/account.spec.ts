import { accountParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { AccountRepository, PgRepository } from '@/infra/database/postgres/repositories'
import { PgConnection } from '@/infra/database/postgres/helpers'
import { Account } from '@/infra/database/postgres/entities'
import { UUIDGenerator } from '@/domain/contracts/gateways'

import { IBackup, IMemoryDb } from 'pg-mem'
import { Repository } from 'typeorm'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import faker from 'faker'

describe('AccountRepository', () => {
  let sut: AccountRepository

  const { id, name, email, password, createdAt } = accountParams

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
  let repository: Repository<Account>

  const uuid = mock<UUIDGenerator>()

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Account])
    backup = database.backup()
    repository = connection.getRepository(Account)

    uuid.generate.mockReturnValue(id)

    MockDate.set(createdAt)
  })

  beforeEach(() => {
    backup.restore()

    sut = new AccountRepository(uuid)
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  describe('checkByEmail()', () => {
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

  describe('create()', () => {
    it('Should return a account on success', async () => {
      const account = await sut.create({ name, email, password })

      expect(account).toEqual({ id, name, email, password, role: null, createdAt })
    })
  })

  describe('loadByEmail()', () => {
    it('Should return undefined if email does not exists', async () => {
      const account = await sut.loadByEmail({ email })

      expect(account).toBeUndefined()
    })

    it('Should return a account if email already exists', async () => {
      await repository.save({ id, name, email, password })

      const account = await sut.loadByEmail({ email })

      expect(account).toEqual({ id, name, email, password, role: null, createdAt })
    })
  })

  describe('checkRole()', () => {
    let role: string

    beforeEach(() => {
      role = faker.random.word()
    })

    it('Should return false if account does not exists', async () => {
      const account = await sut.checkRole({ accountId: id })

      expect(account).toBe(false)
    })

    it('Should return true if account exists without role', async () => {
      await repository.save({ id, name, email, password })

      const account = await sut.checkRole({ accountId: id })

      expect(account).toBe(true)
    })

    it('Should return false if account exists with invalid role', async () => {
      await repository.save({ id, name, email, password })

      const account = await sut.checkRole({ accountId: id, role })

      expect(account).toBe(false)
    })

    it('Should return true if route does not require role and account is admin', async () => {
      await repository.save({ id, name, email, password, role: 'admin' })

      const account = await sut.checkRole({ accountId: id })

      expect(account).toBe(true)
    })
  })
})
