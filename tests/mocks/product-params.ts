import faker from 'faker'

export const productParams = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  description: faker.random.words(2),
  price: faker.datatype.float({ max: 100 }),
  available: faker.datatype.boolean(),
  key: faker.datatype.uuid(),
  picture: faker.internet.url(),
  file: {
    buffer: Buffer.from(faker.random.word()),
    mimeType: faker.random.arrayElement(['image/png', 'image/jpeg'])
  },
  error: new Error(faker.random.word())
}
