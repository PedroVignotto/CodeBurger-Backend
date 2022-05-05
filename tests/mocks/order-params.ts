import faker from 'faker'

const status = ['opened', 'completed']
const date = faker.date.recent()

export const orderParams = {
  id: faker.datatype.uuid(),
  note: faker.random.words(5),
  paymentMode: faker.random.word(),
  total: faker.datatype.float({ max: 200 }),
  status: status[faker.datatype.number(status.length - 1)],
  createdAt: date,
  updatedAt: date,
  error: new Error(faker.random.word())
}
