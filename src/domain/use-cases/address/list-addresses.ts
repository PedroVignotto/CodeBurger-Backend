type Input = { accountId: string }
type Output = Array<{
  id: string
  surname: string
  zipCode: string
  district: string
  street: string
  number: number
  complement?: string
  active: boolean
}>
export type ListAddresses = (input: Input) => Promise<Output>
