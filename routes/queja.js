import { Router } from 'express'
import { QuejaController } from '../controllers/queja.js'

export const QuejaRouter = (Modelos) => {
  const QuejaRouter = Router()
  const quejaController = new QuejaController(Modelos)

  QuejaRouter.post('/obtenerQuejas', quejaController.obtenerQuejas)
  QuejaRouter.post('/obtenerQuejaPorId', quejaController.obtenerQuejaPorId)
  QuejaRouter.post('/crearQueja', quejaController.crearQueja)

  return QuejaRouter
}
