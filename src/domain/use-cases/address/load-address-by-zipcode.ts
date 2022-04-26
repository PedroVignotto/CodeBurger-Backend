type Input = { zipCode: string }
type Output = { district: string, street: string } | undefined
export type LoadAddressByZipCode = (input: Input) => Promise<Output>
