import { CompareValidation, EmailValidation, RequiredValidation, ValidationBuilder as Builder } from '@/application/validation'

import faker from 'faker'

describe('ValidationBuilder', () => {
  let value: string
  let fieldName: string
  let fieldToCompare: string

  beforeAll(() => {
    value = faker.database.column()
    fieldName = faker.database.column()
    fieldToCompare = faker.database.column()
  })

  it('Should return a Required validation if required() is call', () => {
    const validators = Builder.of(value, fieldName).required().build()

    expect(validators).toEqual([new RequiredValidation(value, fieldName)])
  })

  it('Should return a Email validation if email() is call', () => {
    const validators = Builder.of(value, fieldName).email().build()

    expect(validators).toEqual([new EmailValidation(value, fieldName)])
  })

  it('Should return a Compare validation if sameAs() is call', () => {
    const validators = Builder.of(value, fieldName).sameAs(fieldToCompare).build()

    expect(validators).toEqual([new CompareValidation(value, fieldToCompare, fieldName)])
  })
})
