import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { app } from '@/main/config/app'
import { InvalidFieldError, RequiredFieldError, UnauthorizedError } from '@/application/errors'
import { Account, Address } from '@/infra/database/postgres/entities'
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
  let surname: string
  let zipCode: string
  let district: string
  let address: string
  let number: number
  let complement: string

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup

  const searchSpy: jest.Mock = jest.fn()

  mocked(ZipCodeApi).mockImplementation(jest.fn().mockImplementation(() => ({ search: searchSpy })))

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Account, Address])
    backup = database.backup()
  })

  beforeEach(() => {
    backup.restore()

    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password()
    passwordConfirmation = password
    surname = faker.random.word()
    zipCode = faker.address.zipCode('########')
    district = faker.random.words(2)
    address = faker.address.streetName()
    number = faker.datatype.number()
    complement = faker.random.words(3)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('GET /address/:zipCode', () => {
    it('Should return 200 on success', async () => {
      searchSpy.mockReturnValueOnce({ district: faker.random.words(2), address: faker.address.streetName() })
      const { body: { accessToken } } = await request(app).post('/api/signup').send({ name, email, password, passwordConfirmation })

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

  describe('POST /address', () => {
    it('Should return 201 on success', async () => {
      searchSpy.mockReturnValueOnce({ district: faker.random.words(2), address: faker.address.streetName() })
      const { body: { accessToken } } = await request(app).post('/api/signup').send({ name, email, password, passwordConfirmation })

      const { status } = await request(app)
        .post('/api/address')
        .send({ surname, zipCode, district, address, number, complement })
        .set({ authorization: `Bearer: ${accessToken as string}` })

      expect(status).toBe(201)
    })

    it('Should return 400 if zipCode is invalid', async () => {
      const { body: { accessToken } } = await request(app).post('/api/signup').send({ name, email, password, passwordConfirmation })

      const { status, body: { error } } = await request(app)
        .post('/api/address')
        .send({ surname, zipCode, district, address, number, complement })
        .set({ authorization: `Bearer: ${accessToken as string}` })

      expect(status).toBe(400)
      expect(error).toBe(new InvalidFieldError('zipCode').message)
    })

    it('Should return 400 if has invalid data', async () => {
      const { body: { accessToken } } = await request(app).post('/api/signup').send({ name, email, password, passwordConfirmation })

      const { status, body: { error } } = await request(app)
        .post('/api/address')
        .send({ zipCode, district, address, number, complement })
        .set({ authorization: `Bearer: ${accessToken as string}` })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('surname').message)
    })
  })
})
