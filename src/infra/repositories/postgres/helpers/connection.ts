import { createConnection, getConnection, getConnectionManager } from 'typeorm'

export class PgConnection {
  private static instance?: PgConnection

  private constructor () {}

  static getInstance (): PgConnection {
    if (!PgConnection.instance) PgConnection.instance = new PgConnection()
    return PgConnection.instance
  }

  async connect (): Promise<void> {
    getConnectionManager().has('default') ? getConnection() : await createConnection()
  }

  async disconnect (): Promise<void> {
    await getConnection().close()
  }
}
