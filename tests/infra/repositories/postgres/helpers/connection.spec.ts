import { ConnectionNotFoundError } from '@/infra/repositories/postgres/errors'
import { PgConnection } from '@/infra/repositories/postgres/helpers'
import { Account } from '@/infra/repositories/postgres/entities'

import { createConnection, getConnection, getConnectionManager, getRepository } from 'typeorm'
import { mocked } from 'jest-mock'
import faker from 'faker'

jest.mock('typeorm', () => ({
  Entity: jest.fn(),
  PrimaryColumn: jest.fn(),
  Column: jest.fn(),
  CreateDateColumn: jest.fn(),
  createConnection: jest.fn(),
  getConnection: jest.fn(),
  getConnectionManager: jest.fn(),
  getRepository: jest.fn()
}))

describe('PgConnection', () => {
  let sut: PgConnection
  let getConnectionManagerSpy: jest.Mock
  let createConnectionSpy: jest.Mock
  let getConnectionSpy: jest.Mock
  let getRepositorySpy: jest.Mock
  let closeSpy: jest.Mock
  let hasSpy: jest.Mock
  let repositorySpy: string

  beforeAll(() => {
    hasSpy = jest.fn().mockReturnValue(true)
    getConnectionManagerSpy = jest.fn().mockReturnValue({ has: hasSpy })
    mocked(getConnectionManager).mockImplementation(getConnectionManagerSpy)
    createConnectionSpy = jest.fn()
    mocked(createConnection).mockImplementation(createConnectionSpy)
    closeSpy = jest.fn()
    getConnectionSpy = jest.fn().mockReturnValue({ close: closeSpy })
    mocked(getConnection).mockImplementation(getConnectionSpy)
    repositorySpy = faker.database.column()
    getRepositorySpy = jest.fn().mockReturnValue(repositorySpy)
    mocked(getRepository).mockImplementation(getRepositorySpy)
  })

  beforeEach(() => {
    sut = PgConnection.getInstance()
  })

  afterAll(async () => {
    await sut.connect()
    await sut.disconnect()
  })

  it('Should have only one instance', () => {
    expect(sut).toBe(PgConnection.getInstance())
  })

  it('Should create a new connection', async () => {
    hasSpy.mockReturnValueOnce(false)

    await sut.connect()

    expect(createConnectionSpy).toHaveBeenCalledWith()
    expect(createConnectionSpy).toHaveBeenCalledTimes(1)
  })

  it('Should use an existing connection', async () => {
    await sut.connect()

    expect(getConnectionSpy).toHaveBeenCalledWith()
    expect(getConnectionSpy).toHaveBeenCalledTimes(1)
  })

  it('Should close connection', async () => {
    await sut.connect()
    await sut.disconnect()

    expect(closeSpy).toHaveBeenCalledWith()
    expect(closeSpy).toHaveBeenCalledTimes(1)
  })

  it('Should return ConnectionNotFoundError on disconnect if connection is not found', async () => {
    const promise = sut.disconnect()

    expect(closeSpy).not.toHaveBeenCalled()
    await expect(promise).rejects.toThrow(new ConnectionNotFoundError())
  })

  it('Should get repository', async () => {
    await sut.connect()

    const repository = sut.getRepository(Account)

    expect(repository).toBe(repositorySpy)
    expect(getRepositorySpy).toHaveBeenCalledWith(Account)
    expect(getRepositorySpy).toHaveBeenCalledTimes(1)
  })

  it('Should return ConnectionNotFoundError on getRepository if connection is not found', async () => {
    await sut.disconnect()

    expect(getRepositorySpy).not.toHaveBeenCalled()
    expect(() => sut.getRepository(Account)).toThrow(new ConnectionNotFoundError())
  })
})
