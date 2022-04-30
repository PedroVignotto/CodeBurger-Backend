import { categoryParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { CategoryRepository, PgRepository } from '@/infra/database/postgres/repositories'
import { PgConnection } from '@/infra/database/postgres/helpers'
import { Category } from '@/infra/database/postgres/entities'
import { UUIDGenerator } from '@/domain/contracts/gateways'

import { IBackup, IMemoryDb } from 'pg-mem'
import { mock } from 'jest-mock-extended'
import { Repository } from 'typeorm'

describe('CategoryRepository', () => {
  let sut: CategoryRepository

  const { id, name } = categoryParams

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
  let repository: Repository<Category>

  const uuid = mock<UUIDGenerator>()

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Category])
    backup = database.backup()
    repository = connection.getRepository(Category)

    uuid.generate.mockReturnValue(id)
  })

  beforeEach(() => {
    backup.restore()

    sut = new CategoryRepository(uuid)
  })

  it('Should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  describe('checkByName()', () => {
    it('Should return false if category does not exists', async () => {
      const result = await sut.checkByName({ name })

      expect(result).toBe(false)
    })

    it('Should return true if category already exists', async () => {
      await repository.save({ id, name })

      const result = await sut.checkByName({ name })

      expect(result).toBe(true)
    })
  })

  describe('create()', () => {
    it('Should create a category on success', async () => {
      await sut.create({ name })

      expect(await repository.findOne(id)).toBeTruthy()
    })
  })

  describe('list()', () => {
    it('Should return all categories', async () => {
      await repository.save({ id, name })

      const result = await sut.list()

      expect(result).toEqual([{ id, name }])
    })

    it('Should return [] if does not find any category', async () => {
      const result = await sut.list()

      expect(result).toEqual([])
    })
  })

  describe('checkById()', () => {
    it('Should return false if category does not exists', async () => {
      const result = await sut.checkById({ id })

      expect(result).toBe(false)
    })

    it('Should return true if category already exists', async () => {
      await repository.save({ id, name })

      const result = await sut.checkById({ id })

      expect(result).toBe(true)
    })
  })

  describe('delete()', () => {
    it('Should delete a category on success', async () => {
      await repository.save({ id, name })

      await sut.delete({ id })

      expect(await repository.findOne(id)).toBeUndefined()
    })
  })
})
