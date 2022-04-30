export const addCategoryRequest = {
  type: 'object',
  properties: { name: { type: 'string' } },
  required: ['name']
}

export const addCategoryResponse = {
  type: 'object',
  properties: { id: { type: 'string' }, name: { type: 'string' } }
}
