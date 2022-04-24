import { Controller } from '@/application/controllers/controller'
import { InvalidFieldError } from '@/application/errors'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { LoadAddressByZipCode } from '@/domain/use-cases/address'

type HttpRequest = { zipCode: string }
type Model = { district: string, address: string } | Error

export class LoadAddressByZipCodeController extends Controller {
  constructor (private readonly loadAddressByZipCode: LoadAddressByZipCode) { super() }

  async perform ({ zipCode }: HttpRequest): Promise<HttpResponse<Model>> {
    const address = await this.loadAddressByZipCode({ zipCode })

    if (!address) return badRequest(new InvalidFieldError('zipCode'))

    return ok(address)
  }
}
