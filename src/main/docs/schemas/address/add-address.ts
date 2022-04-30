export const addAddressRequest = {
  type: 'object',
  properties: {
    surname: { type: 'string' },
    zipCode: { type: 'string' },
    district: { type: 'string' },
    street: { type: 'string' },
    number: { type: 'number' },
    complement: { type: 'string' }
  },
  required: ['surname', 'zipCode', 'district', 'street', 'number']
}

export const addAddressResponse = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    surname: { type: 'string' },
    zipCode: { type: 'string' },
    district: { type: 'string' },
    street: { type: 'string' },
    number: { type: 'number' },
    complement: { type: 'string' }
  }
}
