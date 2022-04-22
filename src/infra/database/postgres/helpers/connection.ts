import { ConnectionNotFoundError } from '@/infra/database/postgres/errors'

import { Connection, createConnection, getConnection, getConnectionManager, getConnectionOptions, getRepository, ObjectType, Repository } from 'typeorm'

export class PgConnection {
  private static instance?: PgConnection
  private connection?: Connection

  private constructor () {}

  static getInstance (): PgConnection {
    if (!PgConnection.instance) PgConnection.instance = new PgConnection()

    return PgConnection.instance
  }

  async connect (): Promise<void> {
    const defaultOptions = await getConnectionOptions()

    const options = { ...defaultOptions, host: 'postgres' }

    this.connection = getConnectionManager().has('default') ? getConnection() : await createConnection(options)
  }

  async disconnect (): Promise<void> {
    if (!this.connection) throw new ConnectionNotFoundError()

    await getConnection().close()

    this.connection = undefined
  }

  getRepository<Entity> (entity: ObjectType<Entity>): Repository<Entity> {
    if (!this.connection) throw new ConnectionNotFoundError()

    return getRepository(entity)
  }
}
