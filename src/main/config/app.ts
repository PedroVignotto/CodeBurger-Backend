import { setupMiddlewares } from '@/main/config'

import express from 'express'

const app = express()

setupMiddlewares(app)

export { app }
