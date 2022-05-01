import faker from 'faker'

const mimeTypes = ['image/png', 'image/jpeg']

export const productParams = {
  id: faker.datatype.uuid(),
  accountId: faker.datatype.uuid(),
  name: faker.name.findName(),
  description: faker.random.words(2),
  price: faker.datatype.float({ max: 100 }),
  available: faker.datatype.boolean(),
  key: faker.datatype.uuid(),
  picture: faker.internet.url(),
  file: {
    buffer: Buffer.from(faker.random.word()),
    mimeType: mimeTypes[faker.datatype.number(mimeTypes.length - 1)]
  }
}
