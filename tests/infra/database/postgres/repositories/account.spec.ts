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

describe('AccountRepository', () => {
  let sut: AccountRepository

  const { id, name, email, password, role, createdAt } = accountParams

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
      const result = await sut.checkByEmail({ email })

      expect(result).toBe(false)
    })

    it('Should return true if email already exists', async () => {
      await repository.save({ id, name, email, password })

      const result = await sut.checkByEmail({ email })

      expect(result).toBe(true)
    })
  })

  describe('create()', () => {
    it('Should create a account on success', async () => {
      await sut.create({ name, email, password })

      expect(await repository.findOne(id)).toBeTruthy()
    })
  })

  describe('loadByEmail()', () => {
    it('Should return undefined if email does not exists', async () => {
      const result = await sut.loadByEmail({ email })

      expect(result).toBeUndefined()
    })

    it('Should return a account if email already exists', async () => {
      await repository.save({ id, name, email, password })

      const result = await sut.loadByEmail({ email })

      expect(result).toEqual({ id, name, email, password, role: null, createdAt })
    })
  })

  describe('checkRole()', () => {
    it('Should return false if account does not exists', async () => {
      const result = await sut.checkRole({ accountId: id })

      expect(result).toBe(false)
    })

    it('Should return true if account exists without role', async () => {
      await repository.save({ id, name, email, password })

      const result = await sut.checkRole({ accountId: id })

      expect(result).toBe(true)
    })

    it('Should return false if account exists with invalid role', async () => {
      await repository.save({ id, name, email, password })

      const result = await sut.checkRole({ accountId: id, role })

      expect(result).toBe(false)
    })

    it('Should return true if route does not require role and account is admin', async () => {
      await repository.save({ id, name, email, password, role: 'admin' })

      const result = await sut.checkRole({ accountId: id })

      expect(result).toBe(true)
    })
  })
})
