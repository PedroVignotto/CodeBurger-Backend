import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { FieldNotFoundError } from '@/domain/errors'

type Setup = (searchAddressByZipCode: SearchAddressByZipCode) => LoadAddressByZipCode
type Input = { zipCode: string }
type Output = { district: string, street: string }
export type LoadAddressByZipCode = (input: Input) => Promise<Output>

export const loadAddressByZipCodeUseCase: Setup = searchAddressByZipCode => async ({ zipCode }) => {
  const address = await searchAddressByZipCode.search({ zipCode })

  if (!address) throw new FieldNotFoundError('zipCode')

  return address
}
