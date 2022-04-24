import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { app, env } from '@/main/config'
import { auth } from '@/main/middlewares'
import { ForbiddenError, UnauthorizedError } from '@/application/errors'
import { Account } from '@/infra/database/postgres/entities'
import { PgConnection } from '@/infra/database/postgres/helpers'

import { IBackup, IMemoryDb } from 'pg-mem'
import { sign } from 'jsonwebtoken'
import { Repository } from 'typeorm'
import request from 'supertest'
import faker from 'faker'

describe('Auth Middleware', () => {
  let id: string
  let name: string
  let email: string
  let password: string

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

    id = faker.datatype.uuid()
    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  it('Should return 401 if authorization header was not provided', async () => {
    app.get('/fake_route', auth)

    const { status, body } = await request(app).get('/fake_route')

    expect(status).toBe(401)
    expect(body.error).toBe(new UnauthorizedError().message)
  })

  it('Should return 200 if authorization header is valid', async () => {
    const account = await repository.save({ id, name, email, password })
    const token = sign({ key: account.id }, env.secret)
    app.get('/fake_route', auth, (req, res) => { res.json(req.locals) })

    const { status, body } = await request(app)
      .get('/fake_route')
      .set({ authorization: `Bearer: ${token}` })

    expect(status).toBe(200)
    expect(body).toEqual({ accountId: id })
  })

  it('Should return 403 if authorize fails', async () => {
    const token = sign({ key: id }, env.secret)
    app.get('/fake_route', auth, (req, res) => { res.json(req.locals) })

    const { status, body } = await request(app)
      .get('/fake_route')
      .set({ authorization: `Bearer: ${token}` })

    expect(status).toBe(403)
    expect(body.error).toBe(new ForbiddenError().message)
  })
})
