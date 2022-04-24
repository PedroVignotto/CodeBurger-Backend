import { SearchAddressByZipCode } from '@/domain/contracts/gateways'

type Setup = (searchAddressByZipCode: SearchAddressByZipCode) => LoadAddressByZipCode
type Input = { zipCode: string }
type Output = { district: string, address: string } | undefined
export type LoadAddressByZipCode = (input: Input) => Promise<Output>

export const LoadAddressByZipCodeUseCase: Setup = searchAddressByZipCode => async ({ zipCode }) => {
  const address = await searchAddressByZipCode.search({ zipCode })

  if (!address) return undefined

  return address
}
