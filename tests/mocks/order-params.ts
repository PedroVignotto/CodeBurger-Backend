import faker from 'faker'

export const orderParams = {
  note: faker.random.words(5),
  paymentMode: faker.random.word(),
  total: faker.datatype.float({ max: 200 })
}
