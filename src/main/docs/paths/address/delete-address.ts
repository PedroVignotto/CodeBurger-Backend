export const deleteAddress = {
  delete: {
    security: [{ bearerAuth: [] }],
    tags: ['Address'],
    summary: 'Route to update address info',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: { type: 'string' }
    }],
    responses: {
      200: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
