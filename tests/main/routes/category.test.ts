import { accountParams, categoryParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { app } from '@/main/config/app'
import { FieldInUseError, RequiredFieldError } from '@/application/errors'
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
