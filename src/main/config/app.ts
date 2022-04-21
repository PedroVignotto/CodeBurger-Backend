import setupMiddlewares from '@/main/config/middlewares'

import express from 'express'

const app = express()

setupMiddlewares(app)

export { app }
