import { InvalidMimeTypeError } from '@/application/errors'
import { AllowedMimeTypesValidation } from '@/application/validation'

describe('AllowedMimeTypesValidation', () => {
  it('Should return InvalidMimeTypeError if value is invalid', () => {
    const sut = new AllowedMimeTypesValidation(['png'], 'image/jpg')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['png']))
  })

  it('Should return undefined if value is valid', () => {
    const sut = new AllowedMimeTypesValidation(['png'], 'image/png')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('Should return undefined if value is valid', () => {
    const sut = new AllowedMimeTypesValidation(['jpg'], 'image/jpg')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('Should return undefined if value is valid', () => {
    const sut = new AllowedMimeTypesValidation(['jpg'], 'image/jpeg')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
