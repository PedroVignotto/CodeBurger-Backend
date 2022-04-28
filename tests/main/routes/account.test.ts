import { accountParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { app } from '@/main/config/app'
import { FieldInUseError, InvalidFieldError, RequiredFieldError } from '@/application/errors'
import { Account } from '@/infra/database/postgres/entities'
import { PgConnection } from '@/infra/database/postgres/helpers'

import { IBackup, IMemoryDb } from 'pg-mem'
import request from 'supertest'
import { Repository } from 'typeorm'

describe('Account routes', () => {
  const { id, name, email, password, passwordConfirmation } = accountParams

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
  let repository: Repository<Account>

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Account])
    backup = database.backup()
    repository = connection.getRepository(Account)
  })

  beforeEach(() => {
    backup.restore()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('POST /signup', () => {
    it('Should return 201 on success', async () => {
      const { status } = await request(app)
        .post('/api/signup')
        .send({ name, email, password, passwordConfirmation })

      expect(status).toBe(201)
    })

    it('Should return 400 if has invalid data', async () => {
      const { status, body: { error } } = await request(app)
        .post('/api/signup')
        .send({ name, password, passwordConfirmation })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('email').message)
    })

    it('Should return 400 if password and passwordConfirmation does not match', async () => {
      const { status, body: { error } } = await request(app)
        .post('/api/signup')
        .send({ name, email, password, passwordConfirmation: 'other_password' })

      expect(status).toBe(400)
      expect(error).toBe(new InvalidFieldError('passwordConfirmation').message)
    })

    it('Should return 400 if email already exists', async () => {
      await repository.save({ id, name, email, password })

      const { status, body: { error } } = await request(app)
        .post('/api/signup')
        .send({ name, email, password, passwordConfirmation })

      expect(status).toBe(400)
      expect(error).toBe(new FieldInUseError('email').message)
    })
  })

  describe('POST /login', () => {
    it('Should return 200 on success', async () => {
      await request(app).post('/api/signup').send({ name, email, password, passwordConfirmation })

      const { status } = await request(app)
        .post('/api/login')
        .send({ email, password })

      expect(status).toBe(200)
    })

    it('Should return 401 if account does not exists', async () => {
      const { status } = await request(app)
        .post('/api/login')
        .send({ email, password })

      expect(status).toBe(401)
    })

    it('Should return 401 if password is incorrectly', async () => {
      await request(app).post('/api/signup').send({ name, email, password, passwordConfirmation })

      const { status } = await request(app)
        .post('/api/login')
        .send({ email, password: 'incorrectly_password' })

      expect(status).toBe(401)
    })
  })
})
