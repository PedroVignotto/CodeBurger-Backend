import { app } from '@/main/config'

import request from 'supertest'
import faker from 'faker'

describe('BodyParser Middleware', () => {
  let name: string

  beforeEach(() => {
    name = faker.name.findName()
  })

  it('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => { res.send(req.body) })

    await request(app).post('/test_body_parser').send({ name }).expect({ name })
  })
})
