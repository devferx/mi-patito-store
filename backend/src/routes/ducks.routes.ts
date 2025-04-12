import { Router } from 'express'

import {
  getDucks,
  createDuck,
  updateDuck,
  deleteDuck,
} from '../controllers/ducks.controller'

const router = Router()

router.get('/', getDucks)
router.post('/', createDuck)
router.put('/:id', updateDuck)
router.delete('/:id', deleteDuck)

export default router
