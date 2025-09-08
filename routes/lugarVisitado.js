import { Router } from 'express'
import { LugarVisitadoController } from '../controllers/lugarVisitado.js'

export const LugarVisitadoRouter = (Modelos) => {
  const LugarVisitadoRouter = Router()
  const lugarVisitadoController = new LugarVisitadoController(Modelos)

  LugarVisitadoRouter.get('/:id', lugarVisitadoController.obtenerLugarVisitadoPorId)
  LugarVisitadoRouter.post('/obtenerLugaresVisitados', lugarVisitadoController.obtenerTodosLosLugaresVisitados)
  LugarVisitadoRouter.post('/crearLugarVisitado', lugarVisitadoController.crearLugarVisitado)
  LugarVisitadoRouter.post('/obtenerLugarVisitadoIdlugar', lugarVisitadoController.obtenerLugarVisitadoPorIdLugarDeUnTurista)
  LugarVisitadoRouter.post('/eliminarLugarVisitado', lugarVisitadoController.eliminarLugarVisitado)

  return LugarVisitadoRouter
}
