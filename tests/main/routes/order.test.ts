import { accountParams, orderParams, productParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { app } from '@/main/config/app'
import { RequiredFieldError } from '@/application/errors'
import { Account, Category, Order, Product } from '@/infra/database/postgres/entities'
import { PgConnection } from '@/infra/database/postgres/helpers'

import { IBackup, IMemoryDb } from 'pg-mem'
import request from 'supertest'
import { Repository } from 'typeorm'

describe('Order routes', () => {
  const { name: accountName, email, password, passwordConfirmation } = accountParams
  const { id: productId, name: productName, description, price } = productParams
  const { note, total, paymentMode } = orderParams

  let token: string

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
  let repositoryProduct: Repository<Product>

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Account, Category, Product, Order])
    backup = database.backup()
    repositoryProduct = connection.getRepository(Product)
  })

  beforeEach(async () => {
    backup.restore()

    const { body } = await request(app).post('/api/signup').send({ name: accountName, email, password, passwordConfirmation })

    token = body.accessToken
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('POST /order', () => {
    it('Should return 201 on success', async () => {
      await repositoryProduct.save({ id: productId, name: productName, description, price })

      const { status } = await request(app)
        .post('/api/order')
        .send({ productsId: [productId], note, total, paymentMode })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(201)
    })

    it('Should return 400 if has invalid data', async () => {
      const { status, body: { error } } = await request(app)
        .post('/api/order')
        .send({ productsId: [productId], note, paymentMode })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('total').message)
    })
  })
})
