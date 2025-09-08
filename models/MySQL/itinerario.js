import { connectionMySQL } from '../../helpers/connectionMySQL.js'

export class ItinerarioModel {
  static async obtenerItinerariosPorTurista (idTurista) {
    const [itinerarios] = await connectionMySQL.query('select id_Itinerario as ID, usuario_turista.Nombre as Turista, itinerario.Nombre, itinerario.Duracion, itinerario.Estado, itinerario.fecha_creacion from itinerario INNER JOIN usuario_turista ON itinerario.id_Turista = usuario_turista.id where itinerario.id_Turista = ?', [idTurista])

    return itinerarios
  }

  static async obtenerItinerarioPorId (idItinerario) {
    const [lugarFavorito] = await connectionMySQL.query('select * from itinerario where id_Itinerario = ?;', [idItinerario])
    if (lugarFavorito.length === 0) return false

    return lugarFavorito[0]
  }

  static async crearItinerario ({ entrada }) {
    const {
      id_Turista: idTurista, Nombre
    } = entrada

    try {
      await connectionMySQL.query('insert into itinerario (id_Turista, Nombre) values(?, ?);', [idTurista, Nombre])
    } catch (error) {
      throw new Error(error)
    }

    return 'Itinerario creado con éxito'
  }

  static async eliminarItinerario (idItinerario) {
    try {
      await connectionMySQL.query('delete from itinerario where id_Itinerario = ?', [idItinerario])
    } catch (error) {
      throw new Error(error)
    }

    return 'Itinerario eliminado con éxito'
  }

  static async editarEstadoItinerario ({ entrada }) {
    const {
      id_Itinerario: idItinerario, Estado
    } = entrada

    try {
      await connectionMySQL.query('Update itinerario set Estado = ? where id_Itinerario = ?', [Estado, idItinerario])
    } catch (error) {
      throw new Error(error)
    }

    return 'Estado del itinerario actualizado con éxito'
  }
}
