import { productParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { PgRepository, ProductRepository } from '@/infra/database/postgres/repositories'
import { PgConnection } from '@/infra/database/postgres/helpers'
import { Category, Product } from '@/infra/database/postgres/entities'

import { IBackup, IMemoryDb } from 'pg-mem'

describe('ProductRepository', () => {
  let sut: ProductRepository

  const { name } = productParams

  let database: IMemoryDb
  let backup: IBackup

  beforeAll(async () => {
    PgConnection.getInstance()
    database = await makeFakeDatabase([Product, Category])
    backup = database.backup()
  })

  beforeEach(() => {
    backup.restore()

    sut = new ProductRepository()
  })

  it('Should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  it('Should return false if product does not exists', async () => {
    const result = await sut.checkByName({ name })

    expect(result).toBe(false)
  })
})
