export const listAddresses = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Address'],
    summary: 'Route to list user addresses',
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/listAddressesResponse' } } } },
      500: { $ref: '#/components/serverError' }
    }
  }
}
