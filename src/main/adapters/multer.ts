import { ServerError } from '@/application/errors'

import { RequestHandler } from 'express'
import multer from 'multer'

export const multerAdapter: RequestHandler = (req, res, next) => {
  const upload = multer().single('picture')

  upload(req, res, error => {
    res.status(500).json({ error: new ServerError(error).message })
  })
}
