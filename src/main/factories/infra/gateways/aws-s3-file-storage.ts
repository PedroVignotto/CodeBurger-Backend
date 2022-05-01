import { env } from '@/main/config/env'
import { DeleteFile, UploadFile } from '@/domain/contracts/gateways'
import { AwsS3FileStorage } from '@/infra/gateways'

export const makeFileStorage = (): UploadFile & DeleteFile => {
  return new AwsS3FileStorage(env.s3.accessKeyId, env.s3.secretAccessKey, env.s3.bucket)
}
