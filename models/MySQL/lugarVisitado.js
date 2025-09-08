import { connectionMySQL } from '../../helpers/connectionMySQL.js'

export class LugarVisitadoModel {
  static async obtenerTodosLosLugaresVisitados (idTurista) {
    const [lugaresVisitados] = await connectionMySQL.query('select id_Lugar_Visitado, lugar.id_Lugar as "ID LUGAR", lugar.Nombre as NombreLugar from lugar_visitado INNER JOIN lugar ON lugar_visitado.id_Lugar = lugar.id_Lugar where lugar_visitado.id_Turista = ?', [idTurista])

    return lugaresVisitados
  }

  static async obtenerLugarVisitadoPorId (idLugarVisitado) {
    const [lugarVisitado] = await connectionMySQL.query('select id_Lugar_Visitado, id_Lugar, id_Turista from lugar_visitado where id_Lugar_Visitado = ?;', [idLugarVisitado])
    if (lugarVisitado.length === 0) return false

    return lugarVisitado[0]
  }

  static async obtenerLugarVisitadoPorIdLugarDeUnTurista ({ entrada }) {
    const {
      id_Lugar: idLugar, id_Turista: idTurista
    } = entrada

    const [lugarVisitado] = await connectionMySQL.query('select id_Lugar_Visitado, id_Lugar, id_Turista from lugar_visitado where id_Lugar = ? and id_Turista = ?;', [idLugar, idTurista])

    if (lugarVisitado.length === 0) return false

    return lugarVisitado[0]
  }

  static async crearLugarVisitado ({ entrada }) {
    const {
      id_Lugar: idLugar, id_Turista: idTurista
    } = entrada

    try {
      await connectionMySQL.query('insert into lugar_visitado (id_Lugar, id_Turista) values(?, ?);', [idLugar, idTurista])
    } catch (error) {
      throw new Error(error)
    }

    return 'Lugar visitado marcado con éxito'
  }

  static async eliminarLugarVisitado (idLugarVisitado) {
    try {
      await connectionMySQL.query('delete from lugar_visitado where id_Lugar_Visitado = ?', [idLugarVisitado])
    } catch (error) {
      throw new Error(error)
    }

    return 'Lugar visitado eliminado con éxito'
  }
}
