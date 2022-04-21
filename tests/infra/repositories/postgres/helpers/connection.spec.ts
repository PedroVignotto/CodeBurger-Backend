import { PgConnection } from '@/infra/repositories/postgres/helpers'

describe('PgConnection', () => {
  let sut: PgConnection

  beforeEach(() => {
    sut = PgConnection.getInstance()
  })

  it('should have only one instance', () => {
    expect(sut).toBe(PgConnection.getInstance())
  })
})
