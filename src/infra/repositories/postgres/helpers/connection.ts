// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PgConnection {
  private static instance?: PgConnection

  private constructor () {}

  static getInstance (): PgConnection {
    if (!PgConnection.instance) PgConnection.instance = new PgConnection()
    return PgConnection.instance
  }
}
