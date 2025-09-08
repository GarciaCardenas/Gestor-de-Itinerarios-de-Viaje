import { Router } from 'express'
import { ItinerarioController } from '../controllers/itinerario.js'

export const ItinerarioRouter = (Modelos) => {
  const ItinerarioRouter = Router()
  const itinerarioController = new ItinerarioController(Modelos)

  ItinerarioRouter.get('/:id', itinerarioController.obtenerItinerarioPorId)
  ItinerarioRouter.post('/obtenerItinerarios', itinerarioController.obtenerItinerariosPorTurista)
  ItinerarioRouter.post('/crearItinerario', itinerarioController.crearItinerario)
  ItinerarioRouter.post('/eliminarItinerario', itinerarioController.eliminarItinerario)
  ItinerarioRouter.post('/editarEstadoItinerario', itinerarioController.editarEstadoItinerario)

  return ItinerarioRouter
}
