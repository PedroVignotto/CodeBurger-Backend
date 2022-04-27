export const addAddress = {
  post: {
    security: [{ bearerAuth: [] }],
    tags: ['Address'],
    summary: 'Route to create a new address',
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/addAddressRequest' } } } },
    responses: {
      201: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
