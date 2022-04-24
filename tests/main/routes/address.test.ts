import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { app } from '@/main/config/app'
import { Account } from '@/infra/database/postgres/entities'
import { PgConnection } from '@/infra/database/postgres/helpers'

import { IBackup, IMemoryDb } from 'pg-mem'
import request from 'supertest'
import faker from 'faker'

describe('Address routes', () => {
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

  describe('GET /address/:zipCode', () => {
    it('Should return 200 on success', async () => {
      const { body: { accessToken } } = await request(app).post('/api/signup').send({ name, email, password, passwordConfirmation })
      const token: string = accessToken

      const { status, body } = await request(app)
        .get('/api/address/76876522')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
      expect(body).toHaveProperty('address')
      expect(body).toHaveProperty('district')
    })
  })
})
