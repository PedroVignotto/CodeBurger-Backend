export const updateOrder = {
  put: {
    security: [{ bearerAuth: [] }],
    tags: ['Order'],
    summary: 'Route to update status from order',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: { type: 'string' }
    }],
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/updateOrderRequest' } } } },
    responses: {
      204: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
