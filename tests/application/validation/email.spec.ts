import { InvalidFieldError } from '@/application/errors'
import { Email } from '@/application/validation'

import faker from 'faker'

describe('Email', () => {
  let email: string
  let fieldName: string

  beforeEach(() => {
    email = faker.internet.email()
    fieldName = faker.database.column()
  })

  test('Should return InvalidFieldError if email is invalid', () => {
    const sut = new Email(email, fieldName)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return undefined if email is empty', () => {
    const sut = new Email(undefined as any, fieldName)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
