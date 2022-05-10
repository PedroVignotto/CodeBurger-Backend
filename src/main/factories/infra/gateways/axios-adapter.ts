import { HttpGetClient } from '@/infra/contracts/gateways'
import { AxiosHttpClient } from '@/infra/gateways'

export const makeHttpClient = (): HttpGetClient =>
  new AxiosHttpClient()
