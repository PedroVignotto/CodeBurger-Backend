export const deleteProduct = {
  delete: {
    security: [{ bearerAuth: [] }],
    tags: ['Product'],
    summary: 'Route to delete product',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: { type: 'string' }
    }],
    responses: {
      204: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
