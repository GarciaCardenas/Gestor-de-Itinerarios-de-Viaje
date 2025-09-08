import { connectionMySQL } from '../../helpers/connectionMySQL.js'

export class DeleteUsuarioModel {
  static async borrarPorEmail (id) {
    try {
      await connectionMySQL.query(
        'DELETE FROM usuario_turista WHERE id = ?',
        [id]
      )
    } catch (error) {
      throw new Error('Error al borrar el usuario: ' + error.message)
    }
  }
}
