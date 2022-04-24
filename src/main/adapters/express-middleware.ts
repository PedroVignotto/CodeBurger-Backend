import { Middleware } from '@/application/middlewares'

import { RequestHandler } from 'express'

type Adapter = (middleware: Middleware) => RequestHandler

export const expressMiddlewareAdapter: Adapter = middleware => async (req, res, next) => {
  await middleware.handle({ ...req.headers })
}
