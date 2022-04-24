import { ConnectionNotFoundError } from '@/infra/database/postgres/errors'
import { PgConnection } from '@/infra/database/postgres/helpers'
import { Account } from '@/infra/database/postgres/entities'

import { createConnection, getConnection, getConnectionManager, getRepository } from 'typeorm'
import { mocked } from 'jest-mock'
import faker from 'faker'

jest.mock('typeorm', () => ({
  Entity: jest.fn(),
  PrimaryColumn: jest.fn(),
  Column: jest.fn(),
  ManyToOne: jest.fn(),
  JoinColumn: jest.fn(),
  CreateDateColumn: jest.fn(),
  createConnection: jest.fn(),
  getConnection: jest.fn(),
  getConnectionManager: jest.fn(),
  getConnectionOptions: jest.fn(),
  getRepository: jest.fn()
}))

describe('PgConnection', () => {
  let sut: PgConnection

  let repositorySpy: string

  const getConnectionManagerSpy: jest.Mock = jest.fn()
  const createConnectionSpy: jest.Mock = jest.fn()
  const getConnectionSpy: jest.Mock = jest.fn()
  const getRepositorySpy: jest.Mock = jest.fn()
  const closeSpy: jest.Mock = jest.fn()
  const hasSpy: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = PgConnection.getInstance()

    repositorySpy = faker.database.column()

    hasSpy.mockReturnValue(true)
    getConnectionManagerSpy.mockReturnValue({ has: hasSpy })
    mocked(getConnectionManager).mockImplementation(getConnectionManagerSpy)
    mocked(createConnection).mockImplementation(createConnectionSpy)
    getConnectionSpy.mockReturnValue({ close: closeSpy })
    mocked(getConnection).mockImplementation(getConnectionSpy)
    getRepositorySpy.mockReturnValue(repositorySpy)
    mocked(getRepository).mockImplementation(getRepositorySpy)
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

    expect(createConnectionSpy).toHaveBeenCalledWith({ host: 'postgres' })
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
