import { AllowedMimeTypesValidation, CompareValidation, EmailValidation, MaxFileSizeValidation, RequiredValidation, ValidationBuilder as Builder } from '@/application/validation'

import faker from 'faker'

describe('ValidationBuilder', () => {
  let value: string
  let fieldName: string
  let fieldToCompare: string
  let file: { buffer: Buffer, mimeType: string }

  beforeAll(() => {
    value = faker.database.column()
    fieldName = faker.database.column()
    fieldToCompare = faker.database.column()
    file = { buffer: Buffer.from(faker.random.word()), mimeType: faker.system.commonFileExt() }
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

  it('Should return a Image validation if image() is call', () => {
    const validators = Builder.of(file, fieldName).image({ AllowedMimeTypes: ['png'], maxSizeInMb: 5 }).build()

    expect(validators).toEqual([new AllowedMimeTypesValidation(['png'], file.mimeType), new MaxFileSizeValidation(5, file.buffer)])
  })
})
