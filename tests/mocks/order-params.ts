import faker from 'faker'

export const orderParams = {
  id: faker.datatype.uuid(),
  note: faker.random.words(5),
  paymentMode: faker.random.word(),
  total: faker.datatype.float({ max: 200 }),
  error: new Error(faker.random.word())
}
