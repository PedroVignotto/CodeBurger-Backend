export interface SearchAddressByZipCode {
  search: (input: SearchAddressByZipCode.Input) => Promise<SearchAddressByZipCode.Output>
}

export namespace SearchAddressByZipCode {
  export type Input = { zipcode: string }
  export type Output = { district: string, address: string } | undefined
}
