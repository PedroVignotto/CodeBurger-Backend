import { PgConnection } from '@/infra/repositories/postgres/helpers'
import { IMemoryDb, newDb } from 'pg-mem'

export const makeFakeDatabase = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb()

  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infra/repositories/postgres/entities/index.ts']
  })

  await connection.synchronize()

  await PgConnection.getInstance().connect()

  return db
}
