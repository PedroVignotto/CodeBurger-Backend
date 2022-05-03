import { accountParams, categoryParams, productParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { app } from '@/main/config/app'
import { InvalidMimeTypeError, RequiredFieldError } from '@/application/errors'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'
import { Account, Category, Product } from '@/infra/database/postgres/entities'
import { PgConnection } from '@/infra/database/postgres/helpers'
import { AwsS3FileStorage } from '@/infra/gateways'

import { mocked } from 'jest-mock'
import { IBackup, IMemoryDb } from 'pg-mem'
import request from 'supertest'
import { Repository } from 'typeorm'

jest.mock('@/infra/gateways/aws-s3-file-storage')

describe('Product routes', () => {
  const { name: accountName, email, password, passwordConfirmation } = accountParams
  const { id: categoryId, name: categoryName } = categoryParams
  const { id, name, description, price, key, picture, file } = productParams

  let token: string

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
  let repositoryAccount: Repository<Account>
  let repositoryCategory: Repository<Category>
  let repositoryProduct: Repository<Product>

  const uploadSpy: jest.Mock = jest.fn()
  const deleteSpy: jest.Mock = jest.fn()

  mocked(AwsS3FileStorage).mockImplementation(jest.fn().mockImplementation(() => ({ upload: uploadSpy, delete: deleteSpy })))

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Account, Category, Product])
    backup = database.backup()
    repositoryAccount = connection.getRepository(Account)
    repositoryCategory = connection.getRepository(Category)
    repositoryProduct = connection.getRepository(Product)
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

  describe('POST /product', () => {
    it('Should return 201 on success', async () => {
      uploadSpy.mockResolvedValueOnce(picture)

      await repositoryCategory.save({ id: categoryId, name: categoryName })

      const { status } = await request(app)
        .post('/api/product')
        .set({ authorization: `Bearer: ${token}` })
        .attach('picture', file.buffer, { filename: key, contentType: file.mimeType })
        .field('categoryId', categoryId)
        .field('name', name)
        .field('description', description)
        .field('price', price)

      expect(status).toBe(201)
    })

    it('Should return 400 if has invalid data', async () => {
      const { status, body: { error } } = await request(app)
        .post('/api/product')
        .send({ name, description, price })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('categoryId').message)
    })

    it('Should return 400 if name already exists', async () => {
      await repositoryProduct.save({ id, name, description, price })

      const { status, body: { error } } = await request(app)
        .post('/api/product')
        .send({ categoryId, name, description, price })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new FieldInUseError('name').message)
    })

    it('Should return 400 if category does not exists', async () => {
      const { status, body: { error } } = await request(app)
        .post('/api/product')
        .send({ categoryId, name, description, price })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new NonExistentFieldError('categoryId').message)
    })
  })

  describe('GET /products', () => {
    it('Should return 200 on success', async () => {
      await repositoryProduct.save({ id, name, description, price })

      const { status, body } = await request(app)
        .get('/api/products')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
      expect(body).toMatchObject([{ id, name, description, price }])
    })

    it('Should return 200 on success', async () => {
      await repositoryCategory.save({ id: categoryId, name: categoryName })
      await repositoryProduct.save({ id, name, description, price })

      const { status, body } = await request(app)
        .get(`/api/products?categoryId=${categoryId}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
      expect(body).toEqual([])
    })
  })

  describe('PUT /product/:id', () => {
    it('Should return 204 on success', async () => {
      uploadSpy.mockResolvedValueOnce(picture)

      await repositoryCategory.save({ id: categoryId, name: categoryName })
      await repositoryProduct.save({ id, categoryId, name, description, price, picture })

      const { status } = await request(app)
        .put(`/api/product/${id}`)
        .set({ authorization: `Bearer: ${token}` })
        .attach('picture', file.buffer, { filename: key, contentType: file.mimeType })
        .field('categoryId', categoryId)
        .field('name', 'any_name')
        .field('description', description)
        .field('price', price)

      expect(status).toBe(204)
    })

    it('Should return 400 if has invalid data', async () => {
      const { status, body: { error } } = await request(app)
        .put(`/api/product/${id}`)
        .set({ authorization: `Bearer: ${token}` })
        .attach('picture', file.buffer, { filename: key, contentType: 'text/plain' })

      expect(status).toBe(400)
      expect(error).toBe(new InvalidMimeTypeError(['png', 'jpg']).message)
    })

    it('Should return 400 if id does not exists', async () => {
      const { status, body: { error } } = await request(app)
        .put(`/api/product/${id}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new NonExistentFieldError('id').message)
    })

    it('Should return 400 if name already exists', async () => {
      await repositoryProduct.save({ id, name, description, price })

      const { status, body: { error } } = await request(app)
        .put(`/api/product/${id}`)
        .send({ name })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new FieldInUseError('name').message)
    })

    it('Should return 400 if category does not exists', async () => {
      await repositoryProduct.save({ id, name, description, price, picture })

      const { status, body: { error } } = await request(app)
        .put(`/api/product/${id}`)
        .send({ categoryId, name: 'any_name' })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new NonExistentFieldError('categoryId').message)
    })
  })

  describe('DELETE /product/:id', () => {
    it('Should return 204 on success', async () => {
      await repositoryProduct.save({ id, name, description, price, picture })

      const { status } = await request(app)
        .delete(`/api/product/${id}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(204)
      expect(await repositoryProduct.findOne(id)).toBeUndefined()
    })

    it('Should return 400 if no have product with id provided', async () => {
      const { status, body: { error } } = await request(app)
        .delete('/api/product/any_id')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toEqual(new NonExistentFieldError('id').message)
    })
  })
})
