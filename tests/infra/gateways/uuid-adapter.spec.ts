import { UuidAdapter } from '@/infra/gateways'

import { v4 as uuid } from 'uuid'

jest.mock('uuid')

describe('UuidAdapter', () => {
  let sut: UuidAdapter

  beforeEach(() => {
    sut = new UuidAdapter()
  })

  it('Should call uuid', () => {
    sut.generate()

    expect(uuid).toHaveBeenCalledTimes(1)
  })
})
