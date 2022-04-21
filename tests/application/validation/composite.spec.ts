import { ValidationComposite, Validator } from '@/application/validation'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('ValidationComposite', () => {
  let sut: ValidationComposite

  let error1: string
  let error2: string
  let validators: Validator[]

  const validator1 = mock<Validator>()
  const validator2 = mock<Validator>()

  beforeAll(() => {
    validator1.validate.mockReturnValue(undefined)
    validator2.validate.mockReturnValue(undefined)
    validators = [validator1, validator2]
  })

  beforeEach(() => {
    sut = new ValidationComposite(validators)

    error1 = faker.random.word()
    error2 = faker.random.word()
  })

  it('Should return undefined if all Validators return undefined', () => {
    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('Should return the first error if any Validator fails', () => {
    validator1.validate.mockReturnValueOnce(new Error(error1))
    validator2.validate.mockReturnValueOnce(new Error(error2))

    const error = sut.validate()

    expect(error).toEqual(new Error(error1))
  })
})
