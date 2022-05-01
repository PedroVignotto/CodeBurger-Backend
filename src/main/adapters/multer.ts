import { ServerError } from '@/application/errors'

import { RequestHandler } from 'express'
import multer from 'multer'

export const multerAdapter: RequestHandler = (req, res, next) => {
  const upload = multer().single('picture')

  upload(req, res, error => {
    if (error) return res.status(500).json({ error: new ServerError(error).message })

    if (req.file) req.locals = { ...req.locals, file: { buffer: req.file.buffer, mimeType: req.file.mimetype } }

    next()
  })
}
