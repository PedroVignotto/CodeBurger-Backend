import { SearchAddressByZipCode } from '@/domain/contracts/gateways'

type Setup = (searchAddressByZipCode: SearchAddressByZipCode) => LoadAddressByZipCode
type Input = { zipCode: string }
type Output = { district: string, street: string } | undefined
export type LoadAddressByZipCode = (input: Input) => Promise<Output>

export const loadAddressByZipCodeUseCase: Setup = searchAddressByZipCode => async ({ zipCode }) => {
  const address = await searchAddressByZipCode.search({ zipCode })

  if (!address) return undefined

  return address
}
