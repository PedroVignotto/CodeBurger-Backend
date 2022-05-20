import { accountParams, orderParams, productParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { OrderRepository, PgRepository } from '@/infra/database/postgres/repositories'
import { PgConnection } from '@/infra/database/postgres/helpers'
import { Account, Category, Order, Product } from '@/infra/database/postgres/entities'
import { UUIDGenerator } from '@/domain/contracts/gateways'

import { IBackup, IMemoryDb } from 'pg-mem'
import { Repository } from 'typeorm'
import { mock } from 'jest-mock-extended'

describe('OrderRepository', () => {
  let sut: OrderRepository

  const { id: accountId, name: accountName, email, password } = accountParams
  const { id: productId, name: productName, description, price } = productParams
  const { id, total } = orderParams

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
  let repositoryAccount: Repository<Account>
  let repositoryProduct: Repository<Product>
  let repositoryOrder: Repository<Order>

  const uuid = mock<UUIDGenerator>()

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Account, Category, Product, Order])
    backup = database.backup()
    repositoryAccount = connection.getRepository(Account)
    repositoryProduct = connection.getRepository(Product)
    repositoryOrder = connection.getRepository(Order)

    uuid.generate.mockReturnValue(id)
  })

  beforeEach(() => {
    backup.restore()

    sut = new OrderRepository(uuid)
  })

  it('Should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  describe('create()', () => {
    it('Should create a order on success', async () => {
      await repositoryAccount.save({ id: accountId, name: accountName, email, password })
      const product = await repositoryProduct.save({ id: productId, name: productName, description, price })

      await sut.create({ accountId, products: [product], total })

      expect(await repositoryOrder.findOne(id)).toBeTruthy()
    })
  })

  describe('list()', () => {
    it('Should return all user orders', async () => {
      await repositoryAccount.save({ id: accountId, name: accountName, email, password })
      const product = await repositoryProduct.save({ id: productId, name: productName, description, price })
      const { accountId: removeAccountId, ...order } = await repositoryOrder.save({ id, accountId, products: [product], total })

      const result = await sut.list({ accountId })

      expect(result).toEqual([order])
    })

    it('Should return [] if does not find any order', async () => {
      const result = await sut.list({ accountId })

      expect(result).toEqual([])
    })
  })

  describe('checkById()', () => {
    it('Should return false if order does not exists', async () => {
      const result = await sut.checkById({ id })

      expect(result).toBe(false)
    })

    it('Should return true if order already exists', async () => {
      await repositoryAccount.save({ id: accountId, name: accountName, email, password })
      const product = await repositoryProduct.save({ id: productId, name: productName, description, price })
      await repositoryOrder.save({ id, accountId, products: [product], total })

      const result = await sut.checkById({ id })

      expect(result).toBe(true)
    })
  })

  describe('update()', () => {
    it('Should update order on success', async () => {
      await repositoryAccount.save({ id: accountId, name: accountName, email, password })
      const product = await repositoryProduct.save({ id: productId, name: productName, description, price })
      await repositoryOrder.save({ id, accountId, products: [product], total })

      await sut.update({ id, status: 'completed' })

      expect(await repositoryOrder.findOne(id)).toMatchObject({ status: 'completed' })
    })
  })
})
