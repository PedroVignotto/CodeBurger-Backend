import { HttpGetClient, ZipCodeApi } from '@/infra/gateways'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('ZipCodeApi', () => {
  let sut: ZipCodeApi

  let zipcode: string

  const httpClient = mock<HttpGetClient>()

  beforeAll(() => {
    zipcode = faker.address.zipCode('########')
  })

  beforeEach(() => {
    sut = new ZipCodeApi(httpClient)
  })

  it('Should call get with correct values', async () => {
    await sut.search({ zipcode })

    expect(httpClient.get).toHaveBeenCalledWith({ url: `https://ws.apicep.com/cep/${zipcode}.json` })
    expect(httpClient.get).toHaveBeenCalledTimes(1)
  })
})
