import { signup } from '@/main/docs/paths'
import { signUpRequest, signUpResponse, error } from '@/main/docs/schemas'
import { badRequest, forbidden, serverError } from '@/main/docs/components'

export const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'Code Burguer',
    description: 'API created for the Code Burguer application',
    version: '1.0.0',
    contact: {
      name: 'Pedro Vignotto',
      url: 'https://www.linkedin.com/in/pedro-vignotto/'
    }
  },
  servers: [{ url: '/api' }],
  tags: [{ name: 'Account' }],
  paths: { '/signup': signup },
  schemas: { signUpRequest, signUpResponse, error },
  components: { badRequest, forbidden, serverError }
}
