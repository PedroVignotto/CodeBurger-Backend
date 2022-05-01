export const env = {
  port: process.env.PORT ?? 3333,
  secret: process.env.SECRET ?? '585e6a367a7579ea0d122f6e462f8f91',
  s3: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
    bucket: process.env.BUCKET ?? ''
  }
}
