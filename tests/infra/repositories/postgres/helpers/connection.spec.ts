import { PgConnection } from '@/infra/repositories/postgres/helpers'

import { createConnection, getConnectionManager } from 'typeorm'
import { mocked } from 'jest-mock'

jest.mock('typeorm', () => ({
  Entity: jest.fn(),
  PrimaryColumn: jest.fn(),
  Column: jest.fn(),
  CreateDateColumn: jest.fn(),
  createConnection: jest.fn(),
  getConnectionManager: jest.fn()
}))

describe('PgConnection', () => {
  let sut: PgConnection
  let getConnectionManagerSpy: jest.Mock
  let createConnectionSpy: jest.Mock

  beforeAll(() => {
    getConnectionManagerSpy = jest.fn().mockReturnValue({ has: jest.fn().mockReturnValue(false) })
    mocked(getConnectionManager).mockImplementation(getConnectionManagerSpy)
    createConnectionSpy = jest.fn()
    mocked(createConnection).mockImplementation(createConnectionSpy)
  })

  beforeEach(() => {
    sut = PgConnection.getInstance()
  })

  it('Should have only one instance', () => {
    expect(sut).toBe(PgConnection.getInstance())
  })

  it('Should create a new connection', async () => {
    await sut.connect()

    expect(createConnectionSpy).toHaveBeenCalledWith()
    expect(createConnectionSpy).toHaveBeenCalledTimes(1)
  })
})
