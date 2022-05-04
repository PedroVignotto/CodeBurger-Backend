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
  const { id, note, total, paymentMode } = orderParams

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

      await sut.create({ accountId, products: [product], note, total, paymentMode })

      expect(await repositoryOrder.findOne(id)).toBeTruthy()
    })
  })
})
