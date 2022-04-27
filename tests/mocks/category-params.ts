import faker from 'faker'

export const categoryParams = {
  id: faker.datatype.uuid(),
  name: faker.database.column(),
  error: new Error(faker.random.word())
}
