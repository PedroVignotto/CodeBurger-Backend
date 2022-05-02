import { accountParams, categoryParams, productParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { app } from '@/main/config/app'
import { RequiredFieldError } from '@/application/errors'
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

  mocked(AwsS3FileStorage).mockImplementation(jest.fn().mockImplementation(() => ({ upload: uploadSpy })))

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
})