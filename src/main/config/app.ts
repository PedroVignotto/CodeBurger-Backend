import { setupMiddlewares } from '@/main/config/middlewares'
import { setupRoutes } from '@/main/config/routes'
import { setupDocs } from '@/main/config/docs'

import express from 'express'

const app = express()

setupDocs(app)
setupMiddlewares(app)
setupRoutes(app)

export { app }
