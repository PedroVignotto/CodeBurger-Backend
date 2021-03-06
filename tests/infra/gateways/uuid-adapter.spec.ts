import { UUIDAdapter } from '@/infra/gateways'

import { v4 as uuidV4 } from 'uuid'
import { mocked } from 'jest-mock'
import faker from 'faker'

jest.mock('uuid')

describe('UUIDAdapter', () => {
  let sut: UUIDAdapter

  let uuid: string

  beforeAll(() => {
    uuid = faker.datatype.uuid()

    mocked(uuidV4).mockReturnValue(uuid)
  })

  beforeEach(() => {
    sut = new UUIDAdapter()
  })

  it('Should call uuidV4', () => {
    sut.generate()

    expect(uuidV4).toHaveBeenCalledTimes(1)
  })

  it('Should return uuid', () => {
    const generatedUUID = sut.generate()

    expect(generatedUUID).toBe(uuid)
  })
})
