import { AxiosHttpClient } from '@/infra/gateways'

import axios from 'axios'
import faker from 'faker'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient

  let url: string
  let data: any
  let error: Error

  const fakeAxios = axios as jest.Mocked<typeof axios>

  beforeEach(() => {
    sut = new AxiosHttpClient()

    url = faker.internet.url()
    data = faker.random.objectElement()
    error = new Error(faker.random.word())

    fakeAxios.get.mockResolvedValue(data)
  })

  it('Should call get with correct values', async () => {
    await sut.get({ url })

    expect(fakeAxios.get).toHaveBeenCalledWith(url)
    expect(fakeAxios.get).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if get throw', async () => {
    fakeAxios.get.mockRejectedValueOnce(error)

    const promise = sut.get({ url })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should return data on success', async () => {
    const result = await sut.get({ url })

    expect(result).toEqual(data)
  })
})
