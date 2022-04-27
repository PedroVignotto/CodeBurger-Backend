import { accountParams, categoryParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { app } from '@/main/config/app'
import { Account, Category } from '@/infra/database/postgres/entities'
import { PgConnection } from '@/infra/database/postgres/helpers'

import { IBackup, IMemoryDb } from 'pg-mem'
import request from 'supertest'

describe('Category routes', () => {
  const { name, email, password, passwordConfirmation } = accountParams
  const { name: categoryName } = categoryParams

  let token: string

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Account, Category])
    backup = database.backup()
  })

  beforeEach(async () => {
    backup.restore()

    const { body } = await request(app).post('/api/signup').send({ name, email, password, passwordConfirmation })

    token = body.accessToken
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  it('Should return 201 on success', async () => {
    const { status } = await request(app)
      .post('/api/category')
      .send({ name: categoryName })
      .set({ authorization: `Bearer: ${token}` })

    expect(status).toBe(201)
  })
})
