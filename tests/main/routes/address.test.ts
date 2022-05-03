import { accountParams, addressParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { app } from '@/main/config/app'
import { RequiredFieldError } from '@/application/errors'
import { FieldNotFoundError, NonExistentFieldError } from '@/domain/errors'
import { Account, Address } from '@/infra/database/postgres/entities'
import { PgConnection } from '@/infra/database/postgres/helpers'
import { ZipCodeApi } from '@/infra/gateways'

import { mocked } from 'jest-mock'
import { IBackup, IMemoryDb } from 'pg-mem'
import request from 'supertest'
import { Repository } from 'typeorm'

jest.mock('@/infra/gateways/zipcode-api')

describe('Address routes', () => {
  const { name, email, password, passwordConfirmation } = accountParams
  const { id, surname, zipCode, district, street, number, complement } = addressParams

  let token: string

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
  let repositoryAccount: Repository<Account>
  let repositoryAddress: Repository<Address>

  const searchSpy: jest.Mock = jest.fn()

  mocked(ZipCodeApi).mockImplementation(jest.fn().mockImplementation(() => ({ search: searchSpy })))

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Account, Address])
    backup = database.backup()
    repositoryAccount = connection.getRepository(Account)
    repositoryAddress = connection.getRepository(Address)
  })

  beforeEach(async () => {
    backup.restore()

    const { body } = await request(app).post('/api/signup').send({ name, email, password, passwordConfirmation })

    token = body.accessToken
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('GET /address/:zipCode', () => {
    it('Should return 200 on success', async () => {
      searchSpy.mockReturnValueOnce({ district, street })

      const { status } = await request(app)
        .get(`/api/address/${zipCode}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
    })

    it('Should return 400 if zipCode is invalid', async () => {
      const { status, body: { error } } = await request(app)
        .get(`/api/address/${zipCode}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new FieldNotFoundError('zipCode').message)
    })
  })

  describe('POST /address', () => {
    it('Should return 201 on success', async () => {
      searchSpy.mockReturnValueOnce({ district, street })

      const { status } = await request(app)
        .post('/api/address')
        .send({ surname, zipCode, district, street, number, complement })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(201)
    })

    it('Should return 400 if zipCode is invalid', async () => {
      const { status, body: { error } } = await request(app)
        .post('/api/address')
        .send({ surname, zipCode, district, street, number, complement })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new FieldNotFoundError('zipCode').message)
    })

    it('Should return 400 if has invalid data', async () => {
      const { status, body: { error } } = await request(app)
        .post('/api/address')
        .send({ zipCode, district, street, number, complement })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toBe(new RequiredFieldError('surname').message)
    })
  })

  describe('GET /addresses', () => {
    it('Should return 200 on success', async () => {
      searchSpy.mockReturnValueOnce({ district, street })
      await request(app).post('/api/address')
        .send({ surname, zipCode, district, street, number, complement })
        .set({ authorization: `Bearer: ${token}` })

      const { status, body } = await request(app)
        .get('/api/addresses')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(200)
      expect(body).toMatchObject([{ surname, zipCode, district, street, number, complement }])
    })
  })

  describe('PUT /address/:id', () => {
    it('Should return 204 on success', async () => {
      const account = await repositoryAccount.find()
      await repositoryAddress.save({ id, accountId: account[0].id, surname, zipCode, district, street, number, complement })

      const { status } = await request(app)
        .put(`/api/address/${id}`)
        .send({ surname: 'updated_surname' })
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(204)
      expect(await repositoryAddress.findOne(id)).toMatchObject({ surname: 'updated_surname' })
    })

    it('Should return 400 if no have address with id provided', async () => {
      const { status, body: { error } } = await request(app)
        .put('/api/address/any_id')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toEqual(new NonExistentFieldError('id').message)
    })
  })

  describe('DELETE /address/:id', () => {
    it('Should return 204 on success', async () => {
      const account = await repositoryAccount.find()
      await repositoryAddress.save({ id, accountId: account[0].id, surname, zipCode, district, street, number, complement })

      const { status } = await request(app)
        .delete(`/api/address/${id}`)
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(204)
      expect(await repositoryAddress.findOne(id)).toBeUndefined()
    })

    it('Should return 400 if no have address with id provided', async () => {
      const { status, body: { error } } = await request(app)
        .delete('/api/address/any_id')
        .set({ authorization: `Bearer: ${token}` })

      expect(status).toBe(400)
      expect(error).toEqual(new NonExistentFieldError('id').message)
    })
  })
})
