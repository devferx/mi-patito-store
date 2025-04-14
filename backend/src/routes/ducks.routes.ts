import { Router } from 'express'

import { DucksController } from '../controllers/ducks.controller'
import { DucksRepository } from '../repositories/ducks.repository'
import { DucksService } from '../services/ducks.service'

const router = Router()

const ducksRepository = new DucksRepository()
const ducksService = new DucksService(ducksRepository)
const ducksController = new DucksController(ducksService)

router.get('/', ducksController.getDucks)
router.post('/', ducksController.createDuck)
router.put('/:id', ducksController.updateDuck)
router.delete('/:id', ducksController.deleteDuck)

export default router
