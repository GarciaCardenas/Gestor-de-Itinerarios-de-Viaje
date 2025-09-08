import bcryptjs from 'bcryptjs'
import { UsuarioTuristaModel } from '../MySQL/usuarioTurista.js'
import { connectionMySQL } from '../../helpers/connectionMySQL.js'

const usuarioTuristaModel = UsuarioTuristaModel

export class AuthenticatorModel {
  static async registrarUsuarioTurista ({ entrada }) {
    const {
      Nombre, Apellido, Correo, Contrasena, Fecha_Nacimiento: fechaNacimiento
    } = entrada

    const usuarioTuristaPorCorreo = await usuarioTuristaModel.obtenerUsuarioTuristaPorCorreo(Correo)

    if (usuarioTuristaPorCorreo !== false) return 'Ya existe un usuario con ese correo'

    const salt = await bcryptjs.genSalt(10)
    const hashContrasena = await bcryptjs.hash(Contrasena, salt)

    const fechaNacimientoConFormato = new Date(fechaNacimiento)

    try {
      await connectionMySQL.query(
          `insert into usuario_turista (Nombre, Apellido, Correo, Contrasena, Fecha_Nacimiento) 
            values(?, ?, ?, ?, ?);`,
          [Nombre, Apellido, Correo, hashContrasena, fechaNacimientoConFormato]
      )
    } catch (error) {
      throw new Error(error)
      // throw new Error('Error creating usuario_turista');
    }

    const usuarioTuristaCreado = await usuarioTuristaModel.obtenerUsuarioTuristaPorCorreo(Correo)

    return usuarioTuristaCreado
  }

  static async login ({ entrada }) {
    const { Correo, Contrasena } = entrada

    const usuarioTurista = await usuarioTuristaModel.obtenerUsuarioTuristaPorCorreo(Correo)

    if (usuarioTurista === false) return 'Usuario no encontrado'

    const loginCorrecto = await bcryptjs.compare(Contrasena, usuarioTurista.Contrasena)

    if (!loginCorrecto) return 'La contraseña del usuario es incorrecta'

    if (usuarioTurista.Estado_Cuenta === 'N') return 'Para iniciar sesión debes verificar tu cuenta de correo'

    return usuarioTurista
  }

  static async verificarCuenta (Correo) {
    try {
      const usuarioTurista = await usuarioTuristaModel.obtenerUsuarioTuristaPorCorreo(Correo)

      if (usuarioTurista.length === false) return 'Usuario no encontrado'

      await connectionMySQL.query(
        'Update usuario_turista set Estado_Cuenta = "Y" where Correo = ?;',
        [Correo]
      )

      const usuarioVerificado = await usuarioTuristaModel.obtenerUsuarioTuristaPorCorreo(Correo)

      return usuarioVerificado
    } catch (error) {
      return error
    }
  }

  static async olvidarContrasena (Correo) {
    try {
      const usuarioTurista = await usuarioTuristaModel.obtenerUsuarioTuristaPorCorreo(Correo)

      if (usuarioTurista.length === false) return 'Usuario no registrado en la base de datos'

      return usuarioTurista
    } catch (error) {
      return error
    }
  }

  static async establecerNuevaContrasena ({ entrada }) {
    const { Correo, Contrasena } = entrada
    try {
      const usuarioTurista = await usuarioTuristaModel.obtenerUsuarioTuristaPorCorreo(Correo)

      if (usuarioTurista.length === false) return 'Usuario no registrado en la base de datos'

      const salt = await bcryptjs.genSalt(10)
      const hashContrasena = await bcryptjs.hash(Contrasena, salt)

      await connectionMySQL.query(
        'Update usuario_turista set Contrasena = ? where Correo = ?;',
        [hashContrasena, Correo]
      )

      const usuarioTuristaModificado = await usuarioTuristaModel.obtenerUsuarioTuristaPorCorreo(Correo)

      return usuarioTuristaModificado
    } catch (error) {
      return error
    }
  }
}
