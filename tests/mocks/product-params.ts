import faker from 'faker'

const types = ['image/png', 'image/jpeg']

const buffer = Buffer.from(faker.random.word())
const mimeType = types[faker.datatype.number(1)]

export const productParams = {
  accountId: faker.datatype.uuid(),
  name: faker.name.findName(),
  file: { buffer, mimeType }
}
