import { categoryParams, productParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { PgRepository, ProductRepository } from '@/infra/database/postgres/repositories'
import { PgConnection } from '@/infra/database/postgres/helpers'
import { Category, Product } from '@/infra/database/postgres/entities'
import { UUIDGenerator } from '@/domain/contracts/gateways'

import { IBackup, IMemoryDb } from 'pg-mem'
import { Repository } from 'typeorm'
import { mock } from 'jest-mock-extended'

describe('ProductRepository', () => {
  let sut: ProductRepository

  const { id: categoryId, name: categoryName } = categoryParams
  const { id, name, description, price, available, picture } = productParams

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
  let repositoryCategory: Repository<Category>
  let repositoryProduct: Repository<Product>

  const uuid = mock<UUIDGenerator>()

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Product, Category])
    backup = database.backup()
    repositoryCategory = connection.getRepository(Category)
    repositoryProduct = connection.getRepository(Product)

    uuid.generate.mockReturnValue(id)
  })

  beforeEach(() => {
    backup.restore()

    sut = new ProductRepository(uuid)
  })

  it('Should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  describe('checkByName()', () => {
    it('Should return false if product does not exists', async () => {
      const result = await sut.checkByName({ name })

      expect(result).toBe(false)
    })

    it('Should return true if product already exists', async () => {
      await repositoryProduct.save({ id, name, description, price })

      const result = await sut.checkByName({ name })

      expect(result).toBe(true)
    })
  })

  describe('create()', () => {
    it('Should create a product on success', async () => {
      await repositoryCategory.save({ id: categoryId, name: categoryName })

      await sut.create({ categoryId, name, description, price })

      expect(await repositoryProduct.findOne(id)).toBeTruthy()
    })
  })

  describe('list()', () => {
    it('Should return all products', async () => {
      await repositoryCategory.save({ id: categoryId, name: categoryName })
      await repositoryProduct.save({ id, categoryId, name, description, price, available, picture })

      const result = await sut.list({})

      expect(result).toEqual([{ id, categoryId, name, description, price, available, picture }])
    })

    it('Should return all products in a category', async () => {
      await repositoryProduct.save({ id, name, description, price, available, picture })

      const result = await sut.list({ categoryId })

      expect(result).toEqual([])
    })
  })

  describe('checkById()', () => {
    it('Should return false if product does not exists', async () => {
      const result = await sut.checkById({ id })

      expect(result).toBe(false)
    })

    it('Should return true if product already exists', async () => {
      await repositoryProduct.save({ id, name, description, price, available, picture })

      const result = await sut.checkById({ id })

      expect(result).toBe(true)
    })
  })

  describe('load()', () => {
    it('Should return undefined if product does not exists', async () => {
      const result = await sut.load({ id })

      expect(result).toBeUndefined()
    })
  })
})
