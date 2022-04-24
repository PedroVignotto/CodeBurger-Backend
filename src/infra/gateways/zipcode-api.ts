import { HttpGetClient } from '@/infra/contracts/gateways'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'

export class ZipCodeApi implements SearchAddressByZipCode {
  constructor (private readonly httpClient: HttpGetClient) {}

  async search ({ zipcode }: SearchAddressByZipCode.Input): Promise<SearchAddressByZipCode.Output> {
    const url = `https://ws.apicep.com/cep/${zipcode}.json`

    const { data: { status, district, address } } = await this.httpClient.get({ url })

    if (status !== 200) return undefined

    return { district, address }
  }
}
