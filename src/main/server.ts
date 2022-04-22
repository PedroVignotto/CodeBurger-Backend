import './config/module-alias'
import { env } from '@/main/config'
import { PgConnection } from '@/infra/database/postgres/helpers'

import 'reflect-metadata'

PgConnection.getInstance().connect()
  .then(async () => {
    const { app } = await import('@/main/config/app')
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
