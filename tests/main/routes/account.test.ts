import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { app } from '@/main/config/app'
import { Account } from '@/infra/database/postgres/entities'
import { PgConnection } from '@/infra/database/postgres/helpers'

import { IBackup, IMemoryDb } from 'pg-mem'
import request from 'supertest'
import faker from 'faker'
import { InvalidFieldError, RequiredFieldError } from '@/application/errors'

describe('Account routes', () => {
  let name: string
  let email: string
  let password: string
  let passwordConfirmation: string

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Account])
    backup = database.backup()
  })

  beforeEach(() => {
    backup.restore()

    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password()
    passwordConfirmation = password
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('POST /accounts', () => {
    it('Should return 201 on success', async () => {
      const { status } = await request(app)
        .post('/api/accounts')
        .send({ name, email, password, passwordConfirmation })

      expect(status).toBe(201)
    })

    it('Should return 400 if has invalid data', async () => {
      const { status, body: { error } } = await request(app)
        .post('/api/accounts')
        .send({ name, password, passwordConfirmation })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('email').message)
    })

    it('Should return 400 if password and passwordConfirmation does not match', async () => {
      const { status, body: { error } } = await request(app)
        .post('/api/accounts')
        .send({ name, email, password, passwordConfirmation: 'other_password' })

      expect(status).toBe(400)
      expect(error).toBe(new InvalidFieldError('passwordConfirmation').message)
    })
  })
})
