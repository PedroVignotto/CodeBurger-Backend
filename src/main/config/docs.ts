import { noCache } from '@/main/middlewares'
import { swagger } from '@/main/docs'

import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'

export const setupDocs = (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swagger))
}
