import { categoryParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { CategoryRepository, PgRepository } from '@/infra/database/postgres/repositories'
import { PgConnection } from '@/infra/database/postgres/helpers'
import { Category } from '@/infra/database/postgres/entities'
import { UUIDGenerator } from '@/domain/contracts/gateways'

import { IBackup, IMemoryDb } from 'pg-mem'
import { mock } from 'jest-mock-extended'

describe('CategoryRepository', () => {
  let sut: CategoryRepository

  const { id, name } = categoryParams

  let database: IMemoryDb
  let backup: IBackup

  const uuid = mock<UUIDGenerator>()

  beforeAll(async () => {
    PgConnection.getInstance()
    database = await makeFakeDatabase([Category])
    backup = database.backup()

    uuid.generate.mockReturnValue(id)
  })

  beforeEach(() => {
    backup.restore()

    sut = new CategoryRepository(uuid)
  })

  it('Should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  it('Should return false if category does not exists', async () => {
    const categoryExists = await sut.checkByName({ name })

    expect(categoryExists).toBe(false)
  })
})
