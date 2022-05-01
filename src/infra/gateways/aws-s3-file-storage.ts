import { config } from 'aws-sdk'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AwsS3FileStorage {
  constructor (accessKeyId: string, secretAccessKey: string) {
    config.update({ credentials: { accessKeyId, secretAccessKey } })
  }
}
