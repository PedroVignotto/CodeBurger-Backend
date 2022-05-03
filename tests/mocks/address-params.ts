import faker from 'faker'

export const addressParams = {
  id: faker.datatype.uuid(),
  surname: faker.random.word(),
  zipCode: faker.address.zipCode('########'),
  district: faker.random.words(2),
  street: faker.address.streetName(),
  number: faker.datatype.number(),
  complement: faker.random.words(3),
  error: new Error(faker.random.word())
}
