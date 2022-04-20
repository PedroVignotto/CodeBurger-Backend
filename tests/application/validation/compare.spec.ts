import { InvalidFieldError } from '@/application/errors'
import { CompareValidation } from '@/application/validation'

import faker from 'faker'

describe('CompareValidation', () => {
  let field: string
  let fieldToCompareName: string

  beforeAll(() => {
    field = faker.random.words(1)
    fieldToCompareName = faker.database.column()
  })

  test('Should return InvalidFieldError if fields are not equal', () => {
    const sut = new CompareValidation(field, faker.random.words(2), fieldToCompareName)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError(fieldToCompareName))
  })
})
