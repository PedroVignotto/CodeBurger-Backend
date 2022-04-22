import './config/module-alias'
import { PgConnection } from '@/infra/database/postgres/helpers'

import 'reflect-metadata'

PgConnection.getInstance().connect()
  .then(async () => {
    const { app, env: { port } } = await import('@/main/config')

    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  })
  .catch(console.error)
