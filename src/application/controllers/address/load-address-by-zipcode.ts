import { Controller } from '@/application/controllers/controller'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { LoadAddressByZipCode } from '@/domain/use-cases/address'

type HttpRequest = { zipCode: string }
type Model = { district: string, street: string } | Error

export class LoadAddressByZipCodeController extends Controller {
  constructor (private readonly loadAddressByZipCode: LoadAddressByZipCode) { super() }

  async perform ({ zipCode }: HttpRequest): Promise<HttpResponse<Model>> {
    const address = await this.loadAddressByZipCode({ zipCode })

    if (address instanceof Error) return badRequest(address)

    return ok(address)
  }
}
