import { Router } from 'express'

export default (router: Router): void => {
  router.get('/accounts', (req, res) => { res.send() })
}
