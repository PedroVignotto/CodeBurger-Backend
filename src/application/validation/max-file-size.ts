import { MaxFileSizeError } from '@/application/errors'

export class MaxFileSizeValidation {
  constructor (
    private readonly maxSizeInMb: number,
    private readonly value: Buffer
  ) {}

  validate (): Error | undefined {
    return new MaxFileSizeError(this.maxSizeInMb)
  }
}
