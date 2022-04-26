import { RequiredValidation, ValidationBuilder as Builder } from '@/application/validation'

import faker from 'faker'

describe('ValidationBuilder', () => {
  let value: string
  let fieldName: string

  beforeAll(() => {
    value = faker.database.column()
    fieldName = faker.database.column()
  })

  it('Should return a Required validation if required() is call', () => {
    const validators = Builder.of(value, fieldName).required().build()

    expect(validators).toEqual([new RequiredValidation(value, fieldName)])
  })
})
