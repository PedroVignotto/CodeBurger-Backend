import { UploadFile } from '@/domain/contracts/gateways'
import { config, S3 } from 'aws-sdk'

export class AwsS3FileStorage {
  constructor (accessKeyId: string, secretAccessKey: string, private readonly bucket: string) {
    config.update({ credentials: { accessKeyId, secretAccessKey } })
  }

  async upload ({ fileName, file }: UploadFile.Input): Promise<void> {
    await new S3().putObject({ Bucket: this.bucket, Key: fileName, Body: file, ACL: 'public-read' }).promise()
  }
}
