import faker from 'faker'

const mimeTypes = ['image/png', 'image/jpeg']

export const productParams = {
  accountId: faker.datatype.uuid(),
  name: faker.name.findName(),
  key: faker.datatype.uuid(),
  file: {
    buffer: Buffer.from(faker.random.word()),
    mimeType: mimeTypes[faker.datatype.number(mimeTypes.length - 1)]
  }
}
