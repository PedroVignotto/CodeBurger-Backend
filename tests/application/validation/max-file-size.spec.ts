import { MaxFileSizeError } from '@/application/errors'
import { MaxFileSizeValidation } from '@/application/validation'

describe('MaxFileSizeValidation', () => {
  it('Should return MaxFileSizeError if value is invalid', () => {
    const invalidBuffer = Buffer.from(new ArrayBuffer(6 * 1024 * 1024))
    const sut = new MaxFileSizeValidation(5, invalidBuffer)

    const error = sut.validate()

    expect(error).toEqual(new MaxFileSizeError(5))
  })

  it('Should return undefined if value is valid', () => {
    const buffer = Buffer.from(new ArrayBuffer(4 * 1024 * 1024))
    const sut = new MaxFileSizeValidation(5, buffer)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('Should return undefined if value is valid', () => {
    const buffer = Buffer.from(new ArrayBuffer(5 * 1024 * 1024))
    const sut = new MaxFileSizeValidation(5, buffer)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
