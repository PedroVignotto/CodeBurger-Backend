import { Controller, LoginController } from '@/application/controllers'

describe('LoginController', () => {
  let sut: LoginController

  const authentication: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new LoginController(authentication)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })
})
