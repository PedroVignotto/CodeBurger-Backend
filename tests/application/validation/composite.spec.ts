import { ValidationComposite, Validator } from '@/application/validation'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('ValidationComposite', () => {
  let sut: ValidationComposite

  let error1: Error
  let error2: Error
  let validators: Validator[]

  const validator1 = mock<Validator>()
  const validator2 = mock<Validator>()

  beforeAll(() => {
    error1 = new Error(faker.random.word())
    error2 = new Error(faker.random.word())

    validator1.validate.mockReturnValue(undefined)
    validator2.validate.mockReturnValue(undefined)

    validators = [validator1, validator2]
  })

  beforeEach(() => {
    sut = new ValidationComposite(validators)
  })

  it('Should return undefined if all Validators return undefined', () => {
    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('Should return the first error if any Validator fails', () => {
    validator1.validate.mockReturnValueOnce(error1)
    validator2.validate.mockReturnValueOnce(error2)

    const error = sut.validate()

    expect(error).toEqual(error1)
  })
})
