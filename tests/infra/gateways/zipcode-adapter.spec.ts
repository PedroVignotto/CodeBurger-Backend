import { HttpGetClient } from '@/infra/contracts/gateways'
import { ZipCodeApi } from '@/infra/gateways'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('ZipCodeApi', () => {
  let sut: ZipCodeApi

  let zipCode: string
  let district: string
  let address: string

  const httpClient = mock<HttpGetClient>()

  beforeAll(() => {
    zipCode = faker.address.zipCode('########')
    district = faker.random.words(2)
    address = faker.address.streetName()
  })

  beforeEach(() => {
    sut = new ZipCodeApi(httpClient)

    httpClient.get.mockResolvedValue({ data: { status: 200, district, address } })
  })

  it('Should call get with correct values', async () => {
    await sut.search({ zipCode })

    expect(httpClient.get).toHaveBeenCalledWith({ url: `https://ws.apicep.com/cep/${zipCode}.json` })
    expect(httpClient.get).toHaveBeenCalledTimes(1)
  })

  it('Should return undefined if get not find the zip code', async () => {
    httpClient.get.mockResolvedValue({ data: { status: 404 } })

    const result = await sut.search({ zipCode })

    expect(result).toBeUndefined()
  })

  it('Should return district and address on success', async () => {
    const result = await sut.search({ zipCode })

    expect(result).toEqual({ district, address })
  })
})
