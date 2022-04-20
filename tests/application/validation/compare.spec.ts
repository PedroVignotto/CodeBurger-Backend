import { InvalidFieldError } from '@/application/errors'
import { CompareValidation } from '@/application/validation'

import faker from 'faker'

describe('CompareValidation', () => {
  let field: string
  let fieldToCompareValid: string
  let fieldToCompareInvalid: string
  let fieldToCompareName: string

  beforeAll(() => {
    field = faker.random.words(1)
    fieldToCompareValid = field
    fieldToCompareInvalid = faker.random.words(2)
    fieldToCompareName = faker.database.column()
  })

  test('Should return InvalidFieldError if fields are not equal', () => {
    const sut = new CompareValidation(field, fieldToCompareInvalid, fieldToCompareName)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError(fieldToCompareName))
  })

  it('Should return undefined if fields are equal', () => {
    const sut = new CompareValidation(field, fieldToCompareValid, fieldToCompareName)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
