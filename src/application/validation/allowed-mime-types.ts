import { InvalidMimeTypeError } from '@/application/errors'
import { Validator } from '@/application/validation'

export type Extension = 'png' | 'jpg'

export class AllowedMimeTypes implements Validator {
  constructor (
    private readonly allowed: Extension[],
    private readonly mimeType: string
  ) {}

  validate (): Error | undefined {
    return new InvalidMimeTypeError(this.allowed)
  }
}
