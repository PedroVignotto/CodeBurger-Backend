import { accountParams, categoryParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { app } from '@/main/config/app'
import { RequiredFieldError } from '@/application/errors'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'
import { Account, Category } from '@/infra/database/postgres/entities'
import { PgConnection } from '@/infra/database/postgres/helpers'

import { IBackup, IMemoryDb } from 'pg-mem'
import request from 'supertest'
import { Repository } from 'typeorm'

describe('Category routes', () => {
  const { name: accountName, email, password, passwordConfirmation } = accountParams
  const { id, name } = categoryParams

  let token: string

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
  let repository: Repository<Category>

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Account, Category])
    backup = database.backup()
    repository = connection.getRepository(Category)
  })

  beforeEach(async () => {
    backup.restore()

    const { body } = await request(app).post('/api/signup').send({ name: accountName, email, password, passwordConfirmation })

    token = body.accessToken
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('POST /category', () => {
    it('Should return 201 on success', async () => {
      const { status } = await request(app)
        .post('/api/category')
        .send({ name })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(201)
    })

    it('Should return 400 if has invalid data', async () => {
      const { status, body: { error } } = await request(app)
        .post('/api/category')
        .send({ name: undefined })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('name').message)
    })

    it('Should return 400 if name already exists', async () => {
      await repository.save({ id, name })
      const { status, body: { error } } = await request(app)
        .post('/api/category')
        .send({ name })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new FieldInUseError('name').message)
    })
  })

  describe('GET /categories', () => {
    it('Should return 200 on success', async () => {
      await repository.save({ id, name })

      const { status, body } = await request(app)
        .get('/api/categories')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
      expect(body).toMatchObject([{ id, name }])
    })
  })

  describe('DELETE /category/:id', () => {
    it('Should return 204 on success', async () => {
      await repository.save({ id, name })

      const { status } = await request(app)
        .delete(`/api/category/${id}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(204)
      expect(await repository.findOne(id)).toBeUndefined()
    })

    it('Should return 400 if no have category with id provided', async () => {
      const { status, body: { error } } = await request(app)
        .delete('/api/category/any_id')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toEqual(new NonExistentFieldError('id').message)
    })
  })
})
