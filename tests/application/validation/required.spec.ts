import { RequiredFieldError } from '@/application/errors'
import { Required } from '@/application/validation'

import faker from 'faker'

describe('Required', () => {
  let value: string
  let fieldName: string

  beforeEach(() => {
    value = faker.database.column()
    fieldName = faker.database.column()
  })

  it('Should return RequiredFieldError if value is empty', () => {
    const sut = new Required('', fieldName)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError(fieldName))
  })

  it('Should return RequiredFieldError if value is null', () => {
    const sut = new Required(null as any, fieldName)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError(fieldName))
  })

  it('Should return RequiredFieldError if value is undefined', () => {
    const sut = new Required(undefined as any, fieldName)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError(fieldName))
  })

  it('Should return undefined if value is not falsy', () => {
    const sut = new Required(value, fieldName)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
