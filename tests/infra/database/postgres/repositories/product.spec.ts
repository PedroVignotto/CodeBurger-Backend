import { productParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { PgRepository, ProductRepository } from '@/infra/database/postgres/repositories'
import { PgConnection } from '@/infra/database/postgres/helpers'
import { Category, Product } from '@/infra/database/postgres/entities'

import { IBackup, IMemoryDb } from 'pg-mem'
import { Repository } from 'typeorm'

describe('ProductRepository', () => {
  let sut: ProductRepository

  const { id, name, description, price } = productParams

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
  let repository: Repository<Product>

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Product, Category])
    backup = database.backup()
    repository = connection.getRepository(Product)
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

  it('Should return true if product already exists', async () => {
    await repository.save({ id, name, description, price })

    const result = await sut.checkByName({ name })

    expect(result).toBe(true)
  })
})
