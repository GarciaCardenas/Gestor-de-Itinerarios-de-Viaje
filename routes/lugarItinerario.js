import { Router } from 'express'
import { LugarItinerarioController } from '../controllers/lugarItinerario.js'

export const LugarItinerarioRouter = (Modelos) => {
  const LugarItinerarioRouter = Router()
  const lugarItinerarioController = new LugarItinerarioController(Modelos)

  LugarItinerarioRouter.get('/:id', lugarItinerarioController.obtenerLugarItinerarioPorId)
  LugarItinerarioRouter.post('/obtenerLugaresItinerario', lugarItinerarioController.obtenerLugaresPorItinerario)
  LugarItinerarioRouter.post('/obtenerPrimerLugarSinVisitar', lugarItinerarioController.obtenerPrimerLugarItinerarioSinVisitar)
  LugarItinerarioRouter.post('/crearLugarItinerario', lugarItinerarioController.crearLugarItinerario)
  LugarItinerarioRouter.post('/eliminarLugarItinerario', lugarItinerarioController.eliminarLugarItinerario)
  LugarItinerarioRouter.post('/editarLugarItinerario', lugarItinerarioController.editarLugarItinerario)
  LugarItinerarioRouter.post('/editarEstadoLugarItinerario', lugarItinerarioController.editarEstadoLugarItinerario)

  return LugarItinerarioRouter
}
