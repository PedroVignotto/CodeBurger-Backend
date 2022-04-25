import { Controller } from '@/application/controllers/controller'
import { HttpResponse, created } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { AddAddress } from '@/domain/use-cases/address'

type HttpRequest = { accountId: string, surname: string, zipCode: string, district: string, address: string, number: number, complement?: string }
type Model = undefined | Error

export class AddAddressController extends Controller {
  constructor (private readonly addAddress: AddAddress) { super() }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    await this.addAddress(httpRequest)

    return created(undefined)
  }

  override buildValidators ({ surname, zipCode, district, address, number }: HttpRequest): Validator[] {
    return [
      ...Builder.of(surname, 'surname').required().build(),
      ...Builder.of(zipCode, 'zipCode').required().build(),
      ...Builder.of(district, 'district').required().build(),
      ...Builder.of(address, 'address').required().build(),
      ...Builder.of(number, 'number').required().build()
    ]
  }
}
