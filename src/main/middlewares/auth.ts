import { expressMiddlewareAdapter as adapt } from '@/main/adapters'
import { makeAuthenticationMiddleware } from '@/main/factories/application/middlewares'

export const auth = adapt(makeAuthenticationMiddleware())
