import { app } from '@/main/config'

import request from 'supertest'

describe('CORS Middleware', () => {
  it('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => { res.send() })

    await request(app).get('/test_cors')
      .expect('Access-control-Allow-origin', '*')
  })
})
