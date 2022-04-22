module.exports = {
  type: 'postgres',
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ['./src/infra/database/postgres/helpers/migrations/*.ts'],
  entities: ['./src/infra/database/postgres/entities/*.ts'],
  cli: { migrationsDir: './src/infra/database/postgres/helpers/migrations' }
}
