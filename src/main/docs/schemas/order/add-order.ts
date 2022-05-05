export const addOrderRequest = {
  type: 'object',
  properties: {
    productsId: { type: 'array', items: { type: 'string' } },
    note: { type: 'string' },
    paymentMode: { type: 'string' }
  },
  required: ['productsId', 'note', 'paymentMode']
}
