import faker from 'faker'

const date = faker.date.recent()

export const orderParams = {
  id: faker.datatype.uuid(),
  total: faker.datatype.float({ max: 200 }),
  status: faker.random.arrayElement(['opened', 'completed']),
  createdAt: date,
  updatedAt: date,
  error: new Error(faker.random.word())
}
