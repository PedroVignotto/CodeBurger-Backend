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
