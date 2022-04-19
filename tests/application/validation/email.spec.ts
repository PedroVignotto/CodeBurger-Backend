import { InvalidFieldError } from '@/application/errors'
import { Email } from '@/application/validation'

import faker from 'faker'

describe('Email', () => {
  let validEmail: string
  let invalidEmail: string
  let fieldName: string

  beforeEach(() => {
    validEmail = faker.internet.email()
    invalidEmail = faker.random.word()
    fieldName = faker.database.column()
  })

  test('Should return InvalidFieldError if email is invalid', () => {
    const sut = new Email(invalidEmail, fieldName)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return undefined if email is empty', () => {
    const sut = new Email(undefined as any, fieldName)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  test('Should return undefined if email is valid', () => {
    const sut = new Email(validEmail, fieldName)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
