import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { app } from '@/main/config/app'
import { InvalidFieldError, UnauthorizedError } from '@/application/errors'
import { Account } from '@/infra/database/postgres/entities'
import { PgConnection } from '@/infra/database/postgres/helpers'
import { ZipCodeApi } from '@/infra/gateways'

import { mocked } from 'jest-mock'
import { IBackup, IMemoryDb } from 'pg-mem'
import request from 'supertest'
import faker from 'faker'

jest.mock('@/infra/gateways/zipcode-api')

describe('Address routes', () => {
  let name: string
  let email: string
  let password: string
  let passwordConfirmation: string
  let zipCode: string

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup

  const searchSpy: jest.Mock = jest.fn()

  mocked(ZipCodeApi).mockImplementation(jest.fn().mockImplementation(() => ({ search: searchSpy })))

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
    zipCode = faker.address.zipCode('########')
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('GET /address/:zipCode', () => {
    it('Should return 200 on success', async () => {
      const { body: { accessToken } } = await request(app).post('/api/signup').send({ name, email, password, passwordConfirmation })
      searchSpy.mockReturnValueOnce({ district: faker.random.words(2), address: faker.address.streetName() })

      const { status, body } = await request(app)
        .get(`/api/address/${zipCode}`)
        .set({ authorization: `Bearer: ${accessToken as string}` })

      expect(status).toBe(200)
      expect(body).toHaveProperty('address')
      expect(body).toHaveProperty('district')
    })

    it('Should return 400 if zipCode is invalid', async () => {
      const { body: { accessToken } } = await request(app).post('/api/signup').send({ name, email, password, passwordConfirmation })
      const token: string = accessToken

      const { status, body: { error } } = await request(app)
        .get(`/api/address/${zipCode}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new InvalidFieldError('zipCode').message)
    })

    it('Should return 401 if authorization header was not provided', async () => {
      const { status, body: { error } } = await request(app)
        .get(`/api/address/${zipCode}`)

      expect(status).toBe(401)
      expect(error).toBe(new UnauthorizedError().message)
    })
  })
})
