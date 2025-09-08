import { connectionMySQL } from '../../helpers/connectionMySQL.js'

export class QuejaModel {
  static async obtenerQuejas (idTurista) {
    const [quejas] = await connectionMySQL.query('select id_Queja as "ID", usuario_turista.Nombre, categoria, comentario, fecha_envio from queja INNER JOIN usuario_turista ON queja.id_Turista = usuario_turista.id where queja.id_Turista = ?', [idTurista])

    return quejas
  }

  static async obtenerQuejaPorId ({ entrada }) {
    console.log(entrada)
    const {
      id_Turista: idTurista, id_Queja: idQueja
    } = entrada

    const [queja] = await connectionMySQL.query('select id_Queja as "ID", usuario_turista.Nombre, categoria, comentario, fecha_envio from queja INNER JOIN usuario_turista ON queja.id_Turista = usuario_turista.id where queja.id_Turista = ? and id_Queja = ?', [idTurista, idQueja])
    if (queja.length === 0) return false

    return queja[0]
  }

  static async crearQueja ({ entrada }) {
    const {
      id_Turista: idTurista, categoria, comentario
    } = entrada

    try {
      await connectionMySQL.query('insert into queja (id_Turista, categoria, comentario) values(?, ?, ?);', [idTurista, categoria, comentario])
    } catch (error) {
      throw new Error(error)
    }

    return 'Queja creado con éxito'
  }
}
