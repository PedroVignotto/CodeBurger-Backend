import { AwsS3FileStorage } from '@/infra/gateways'

import { config } from 'aws-sdk'
import faker from 'faker'

jest.mock('aws-sdk')

describe('AwsS3FileStorage', () => {
  let sut: AwsS3FileStorage

  let secretAccessKey: string
  let accessKeyId: string

  beforeAll(() => {
    accessKeyId = faker.datatype.uuid()
    secretAccessKey = faker.datatype.uuid()
  })

  beforeEach(() => {
    sut = new AwsS3FileStorage(accessKeyId, secretAccessKey)
  })

  it('Should config aws credentials on creation', () => {
    expect(sut).toBeDefined()
    expect(config.update).toHaveBeenCalledWith({ credentials: { accessKeyId, secretAccessKey } })
    expect(config.update).toHaveBeenCalledTimes(1)
  })
})
