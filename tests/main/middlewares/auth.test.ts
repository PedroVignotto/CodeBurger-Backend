import { UnauthorizedError } from '@/application/errors'
import { app } from '@/main/config/app'
import { auth } from '@/main/middlewares'

import request from 'supertest'

describe('Auth Middleware', () => {
  it('Should return 401 if Authorization header was not provided', async () => {
    app.get('/fake_route', auth)

    const { status, body } = await request(app).get('/fake_route')

    expect(status).toBe(401)
    expect(body.error).toBe(new UnauthorizedError().message)
  })
})
