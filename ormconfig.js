module.exports = {
  type: 'postgres',
  port: 5432,
  host: process.env.NODE_ENV === 'test' ? 'localhost' : 'postgres',
  username: 'docker',
  password: 'docker_postgres',
  database: 'codeBurguer',
  migrations: ['./src/infra/database/postgres/helpers/migrations/*.ts'],
  entities: ['./src/infra/database/postgres/entities/*.ts'],
  cli: { migrationsDir: './src/infra/database/postgres/helpers/migrations' }
}
