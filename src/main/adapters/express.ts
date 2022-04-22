import { Controller } from '@/application/controllers'

import { Request, Response } from 'express'

export class ExpressRouter {
  constructor (private readonly controller: Controller) {}

  async adapt (req: Request, res: Response): Promise<void> {
    const httpResponse = await this.controller.handle({ ...req.body })

    res.status(200).json(httpResponse.data)
  }
}
