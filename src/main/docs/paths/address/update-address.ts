export const updateAddress = {
  put: {
    security: [{ bearerAuth: [] }],
    tags: ['Address'],
    summary: 'Route to update address info',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: { type: 'string' }
    }],
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/updateAddressRequest' } } } },
    responses: {
      204: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
