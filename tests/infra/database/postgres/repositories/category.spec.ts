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

  it('Should return false if category does not exists', async () => {
    const categoryExists = await sut.checkByName({ name })

    expect(categoryExists).toBe(false)
  })

  it('Should return true if category already exists', async () => {
    await repository.save({ id, name })

    const categoryExists = await sut.checkByName({ name })

    expect(categoryExists).toBe(true)
  })
})