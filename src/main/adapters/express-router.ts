import { Controller } from '@/application/controllers'

import { Request, Response } from 'express'

export class ExpressRouter {
  constructor (private readonly controller: Controller) {}

  async adapt (req: Request, res: Response): Promise<void> {
    const { statusCode, data } = await this.controller.handle({ ...req.body })

    const json = statusCode === 200 ? data : { error: data.message }

    res.status(statusCode).json(json)
  }
}
