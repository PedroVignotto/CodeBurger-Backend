export const loadAddressByZipCode = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Address'],
    summary: 'Route to fetch address by zip code',
    parameters: [{
      in: 'path',
      name: 'zipCode',
      required: true,
      schema: { type: 'string' }
    }],
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/loadAddressByZipCodeResponse' } } } },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
