import { app } from '@/main/config'
import { authAdmin } from '@/main/middlewares'
import { UnauthorizedError } from '@/application/errors'

import request from 'supertest'

describe('AuthAdmin Middleware', () => {
  it('Should return 401 if authorization header was not provided', async () => {
    app.get('/fake_route', authAdmin)

    const { status, body } = await request(app).get('/fake_route')

    expect(status).toBe(401)
    expect(body.error).toBe(new UnauthorizedError().message)
  })
})
