// UpdateUsuarioRoute.js
import { Router } from 'express'
import { UpdateUsuarioController } from '../controllers/UpdateUsuarioController.js'

export const UpdateUsuarioRouter = (Modelos) => {
  const UpdateUsuarioModel = Router()
  const updateUsuarioController = new UpdateUsuarioController(Modelos)

  // Ruta para actualizar el nombre del usuario
  UpdateUsuarioModel.put('/nombre/:id', updateUsuarioController.actualizarNombre)

  // Ruta para actualizar el apellido del usuario
  UpdateUsuarioModel.put('/apellido/:id', updateUsuarioController.actualizarApellido)

  // Ruta para actualizar el correo del usuario
  UpdateUsuarioModel.put('/correo/:id', updateUsuarioController.actualizarCorreo)

  // Ruta para actualizar la fecha de nacimiento del usuario
  UpdateUsuarioModel.put('/fechaNacimiento/:id', updateUsuarioController.actualizarFechaNacimiento)

  return UpdateUsuarioModel
}
