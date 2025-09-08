import bcryptjs from 'bcryptjs'
import { connectionMySQL } from '../../helpers/connectionMySQL.js'

export class UsuarioTuristaModel {
  static async obtenerTodosLosUsuarios () {
    const [usuarioTurista] = await connectionMySQL.query(
      'select id, Nombre, Apellido, Correo, Contrasena, Estado_Cuenta, Fecha_Nacimiento, Fecha_Registro from usuario_turista;'
    )
    return usuarioTurista
  }

  static async obtenerUsuarioTuristaPorCorreo (Correo) {
    const [usuarioTurista] = await connectionMySQL.query(
      'select * from usuario_turista where Correo = ?;', [Correo]
    )

    if (usuarioTurista.length === 0) return false
    return usuarioTurista[0]
  }

  static async obtenerUsuarioTuristaPorId (id) {
    const [usuarioTurista] = await connectionMySQL.query(
      'select * from usuario_turista where id = ?;', [id]
    )

    if (usuarioTurista.length === 0) return false
    return usuarioTurista[0]
  }

  static async cambiarContraseña ({ entrada }) {
    const {
      id_Turista: idTurista, Contrasena
    } = entrada

    const existeUsuario = await this.obtenerUsuarioTuristaPorId(idTurista)

    if (!existeUsuario) return 'El usuario no existe'

    const salt = await bcryptjs.genSalt(10)
    const hashContrasena = await bcryptjs.hash(Contrasena, salt)

    try {
      await connectionMySQL.query(
        'update usuario_turista set contrasena = ? where id = ?', [hashContrasena, idTurista]
      )

      const usuarioEditado = await this.obtenerUsuarioTuristaPorId(idTurista)
      console.log(usuarioEditado)
      return usuarioEditado
    } catch (error) {
      return error
    }
  }
}
