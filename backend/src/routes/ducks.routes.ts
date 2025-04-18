import { Router } from 'express'

import { DucksController } from '../controllers/ducks.controller'
import { DucksRepository } from '../repositories/ducks.repository'
import { DucksService } from '../services/ducks.service'

import { CreateDuckSchema } from '../dtos/duck/create-duck.dto'
import { UpdateDuckSchema } from '../dtos/duck/update-duck.dto'
import { validatorHandler } from '../middlewares/validator.handler'

const router = Router()

const ducksRepository = new DucksRepository()
const ducksService = new DucksService(ducksRepository)
const ducksController = new DucksController(ducksService)

router.get('/', ducksController.getDucks)
router.post('/', validatorHandler(CreateDuckSchema), ducksController.createDuck)
router.put(
  '/:id',
  validatorHandler(UpdateDuckSchema),
  ducksController.updateDuck,
)
router.delete('/:id', ducksController.deleteDuck)

export default router
