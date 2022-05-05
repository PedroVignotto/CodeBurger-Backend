export const listOrders = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Order'],
    summary: 'Route to list user orders',
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/listOrdersResponse' } } } },
      401: { $ref: '#/components/unauthorized' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
