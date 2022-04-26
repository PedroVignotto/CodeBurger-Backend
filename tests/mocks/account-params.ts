import faker from 'faker'

const password = faker.internet.password(8)

export const accountParams = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password,
  passwordConfirmation: password,
  hashedPassword: faker.internet.password(16),
  accessToken: faker.datatype.uuid(),
  role: faker.random.word(),
  createdAt: faker.date.recent(),
  error: new Error(faker.random.word())
}
