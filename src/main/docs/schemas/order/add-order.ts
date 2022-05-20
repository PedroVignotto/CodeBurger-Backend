export const addOrderRequest = {
  type: 'object',
  properties: {
    productsId: { type: 'array', items: { type: 'string' } }
  },
  required: ['productsId']
}
