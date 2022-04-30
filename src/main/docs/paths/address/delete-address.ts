export const deleteAddress = {
  delete: {
    security: [{ bearerAuth: [] }],
    tags: ['Address'],
    summary: 'Route to delete address',
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
