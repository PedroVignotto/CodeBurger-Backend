import { HttpGetClient } from '@/infra/gateways'

import axios from 'axios'

type Input = HttpGetClient.Input

export class AxiosHttpClient implements HttpGetClient {
  async get ({ url }: Input): Promise<any> {
    const response = await axios.get(url)

    return response
  }
}
