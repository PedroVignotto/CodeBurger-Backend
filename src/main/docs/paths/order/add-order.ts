export const addOrder = {
  post: {
    security: [{ bearerAuth: [] }],
    tags: ['Order'],
    summary: 'Route to create a new order',
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/addOrderRequest' } } } },
    responses: {
      201: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
