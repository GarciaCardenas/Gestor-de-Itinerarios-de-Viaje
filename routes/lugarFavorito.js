import { Router } from 'express'
import { LugarFavoritoController } from '../controllers/lugarFavorito.js'

export const LugarFavoritoRouter = (Modelos) => {
  const LugarFavoritoRouter = Router()
  const lugarFavoritoController = new LugarFavoritoController(Modelos)

  LugarFavoritoRouter.get('/:id', lugarFavoritoController.obtenerLugarFavoritoPorId)
  LugarFavoritoRouter.post('/obtenerLugaresFavoritos', lugarFavoritoController.obtenerTodosLosLugaresFavoritos)
  LugarFavoritoRouter.post('/crearLugarFavorito', lugarFavoritoController.crearLugarFavorito)
  LugarFavoritoRouter.post('/obtenerLugarFavoritoIdlugar', lugarFavoritoController.obtenerLugarFavoritoPorIdLugarDeUnTurista)
  LugarFavoritoRouter.post('/eliminarLugarFavorito', lugarFavoritoController.eliminarLugarFavorito)

  return LugarFavoritoRouter
}
