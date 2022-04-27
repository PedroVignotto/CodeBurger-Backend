import faker from 'faker'

export const categoryParams = {
  name: faker.database.column(),
  error: new Error(faker.random.word())
}
