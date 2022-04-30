import faker from 'faker'

export const productParams = {
  accountId: faker.datatype.uuid(),
  name: faker.name.findName()
}
