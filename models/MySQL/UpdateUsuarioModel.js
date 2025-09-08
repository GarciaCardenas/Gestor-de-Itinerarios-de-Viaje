// UpdateUsuarioModel.js
import { connectionMySQL } from '../../helpers/connectionMySQL.js'

export class UpdateUsuarioModel {
  static async actualizarNombre ({ id, Nombre }) {
    try {
      const result = await connectionMySQL.query(
        'UPDATE usuario_turista SET Nombre = ? WHERE id = ?',
        [Nombre, id]
      )
    } catch (error) {
      throw new Error('Error al actualizar el nombre: ' + error.message)
    }
  }

  static async actualizarApellido ({ id, Apellido }) {
    try {
      await connectionMySQL.query(
        'UPDATE usuario_turista SET Apellido = ? WHERE id = ?',
        [Apellido, id]
      )
    } catch (error) {
      throw new Error('Error al actualizar el apellido: ' + error.message)
    }
  }

  static async actualizarCorreo ({ id, Correo }) {
    try {
      await connectionMySQL.query(
        'UPDATE usuario_turista SET Correo = ? WHERE id = ?',
        [Correo, id]
      )
    } catch (error) {
      throw new Error('Error al actualizar el correo: ' + error.message)
    }
  }

  static async actualizarFechaNacimiento ({ id, Fecha_Nacimiento }) {
    try {
      await connectionMySQL.query(
        'UPDATE usuario_turista SET Fecha_Nacimiento = ? WHERE id = ?',
        [Fecha_Nacimiento, id]
      )
    } catch (error) {
      throw new Error('Error al actualizar la fecha de nacimiento: ' + error.message)
    }
  }
}
