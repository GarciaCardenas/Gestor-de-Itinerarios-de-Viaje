import { Router } from 'express'
import { LugarController } from '../controllers/lugar.js'

export const LugarRouter = (Modelos) => {
  const LugarRouter = Router()
  const lugarController = new LugarController(Modelos)

  LugarRouter.get('/', lugarController.obtenerTodosLosLugares)
  LugarRouter.get('/:id', lugarController.obtenerLugarPorId)
  LugarRouter.post('/crearLugar', lugarController.crearLugar)

  return LugarRouter
}
