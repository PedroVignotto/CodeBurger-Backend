import { addressParams } from '@/tests/mocks'
import { HttpGetClient } from '@/infra/contracts/gateways'
import { ZipCodeApi } from '@/infra/gateways'

import { mock } from 'jest-mock-extended'

describe('ZipCodeApi', () => {
  let sut: ZipCodeApi

  const { zipCode, district, street } = addressParams

  const httpClient = mock<HttpGetClient>()

  beforeAll(() => {
    httpClient.get.mockResolvedValue({ data: { status: 200, district, address: street } })
  })

  beforeEach(() => {
    sut = new ZipCodeApi(httpClient)
  })

  it('Should call get with correct values', async () => {
    await sut.search({ zipCode })

    expect(httpClient.get).toHaveBeenCalledWith({ url: `https://ws.apicep.com/cep/${zipCode}.json` })
    expect(httpClient.get).toHaveBeenCalledTimes(1)
  })

  it('Should return undefined if get not find the zip code', async () => {
    httpClient.get.mockResolvedValueOnce({ data: { status: 404 } })

    const result = await sut.search({ zipCode })

    expect(result).toBeUndefined()
  })

  it('Should return district and address on success', async () => {
    const result = await sut.search({ zipCode })

    expect(result).toEqual({ district, street })
  })
})
