import { accountParams, orderParams, productParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { app } from '@/main/config/app'
import { RequiredFieldError } from '@/application/errors'
import { Account, Category, Order, Product } from '@/infra/database/postgres/entities'
import { PgConnection } from '@/infra/database/postgres/helpers'

import { IBackup, IMemoryDb } from 'pg-mem'
import request from 'supertest'
import { Repository } from 'typeorm'
import { NonExistentFieldError, ValueNotExpectedError } from '@/domain/errors'

describe('Order routes', () => {
  const { name: accountName, email, password, passwordConfirmation } = accountParams
  const { id: productId, name: productName, description, price } = productParams
  const { note, total, paymentMode } = orderParams

  let token: string

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
  let repositoryAccount: Repository<Account>
  let repositoryProduct: Repository<Product>
  let repositoryOrder: Repository<Order>

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Account, Category, Product, Order])
    backup = database.backup()
    repositoryAccount = connection.getRepository(Account)
    repositoryProduct = connection.getRepository(Product)
    repositoryOrder = connection.getRepository(Order)
  })

  beforeEach(async () => {
    backup.restore()

    const { body } = await request(app).post('/api/signup').send({ name: accountName, email, password, passwordConfirmation })

    token = body.accessToken

    const account = await repositoryAccount.find()

    await repositoryAccount.update({ id: account[0].id }, { role: 'admin' })
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('POST /order', () => {
    it('Should return 201 on success', async () => {
      await repositoryProduct.save({ id: productId, name: productName, description, price })

      const { status } = await request(app)
        .post('/api/order')
        .send({ productsId: [productId], note, total: price, paymentMode })
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

    it('Should return 400 if the products do not exists', async () => {
      const { status, body: { error } } = await request(app)
        .post('/api/order')
        .send({ productsId: [], note, total, paymentMode })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new NonExistentFieldError('productsId').message)
    })

    it('Should return 400 if total provided not match with price products', async () => {
      await repositoryProduct.save({ id: productId, name: productName, description, price: 10 })

      const { status, body: { error } } = await request(app)
        .post('/api/order')
        .send({ productsId: [productId], note, total: 20, paymentMode })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new ValueNotExpectedError('total').message)
    })
  })

  describe('GET /orders', () => {
    it('Should return 200 on success', async () => {
      const product = await repositoryProduct.save({ id: productId, name: productName, description, price })
      await request(app).post('/api/order')
        .send({ productsId: [productId], note, total: price, paymentMode })
        .set({ authorization: `Bearer: ${token}` })

      const { status, body } = await request(app)
        .get('/api/orders')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
      expect(body).toMatchObject([{ products: [product], note, total: price, paymentMode, status: 'opened' }])
    })
  })

  describe('PUT /order/:id', () => {
    it('Should return 204 on success', async () => {
      await repositoryProduct.save({ id: productId, name: productName, description, price })
      await request(app).post('/api/order')
        .send({ productsId: [productId], note, total: price, paymentMode })
        .set({ authorization: `Bearer: ${token}` })
      const order = await repositoryOrder.find()

      const { status } = await request(app)
        .put(`/api/order/${order[0].id}`)
        .send({ status: 'completed' })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(204)
      expect(await repositoryOrder.findOne(order[0].id)).toMatchObject({ status: 'completed' })
    })

    it('Should return 400 if has invalid data', async () => {
      const { status, body: { error } } = await request(app)
        .put('/api/order/any_id')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('status').message)
    })

    it('Should return 400 if no have order with id provided', async () => {
      const { status, body: { error } } = await request(app)
        .put('/api/order/any_id')
        .send({ status: 'completed' })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toEqual(new NonExistentFieldError('id').message)
    })
  })
})
