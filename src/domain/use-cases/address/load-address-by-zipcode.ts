import { SearchAddressByZipCode } from '@/domain/contracts/gateways'

type Setup = (searchAddressByZipCode: SearchAddressByZipCode) => LoadAddressByZipCode
type Input = { zipCode: string }
type Output = undefined
export type LoadAddressByZipCode = (input: Input) => Promise<Output>

export const LoadAddressByZipCodeUseCase: Setup = searchAddressByZipCode => async ({ zipCode }) => {
  await searchAddressByZipCode.search({ zipCode })

  return undefined
}
