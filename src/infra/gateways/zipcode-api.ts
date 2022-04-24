import { HttpGetClient } from '@/infra/gateways'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'

export class ZipCodeApi implements SearchAddressByZipCode {
  constructor (private readonly httpClient: HttpGetClient) {}

  async search ({ zipcode }: SearchAddressByZipCode.Input): Promise<SearchAddressByZipCode.Output> {
    await this.httpClient.get({ url: `https://ws.apicep.com/cep/${zipcode}.json` })

    return undefined
  }
}
