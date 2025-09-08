import { connectionMySQL } from '../../helpers/connectionMySQL.js'

export class LugarItinerarioModel {
  static async obtenerLugaresPorItinerario (idItinerario) {
    const [lugaresDeItinerario] = await connectionMySQL.query('select id_Lugar_Itinerario as ID, itinerario.id_Itinerario as "ID itinerario", itinerario.Nombre as Itinerario, lugar_itinerario.Estado as "Estado Lugar", lugar.id_Lugar as "ID lugar", Posicion as "Posición en itinerario", MetodoTransporte as "Metodo de transporte" from lugar_itinerario INNER JOIN lugar ON lugar_itinerario.id_Lugar = lugar.id_Lugar INNER JOIN itinerario ON lugar_itinerario.id_Itinerario = itinerario.id_Itinerario where lugar_itinerario.id_Itinerario = ? order by Posicion desc', [idItinerario])

    console.log(lugaresDeItinerario)

    return lugaresDeItinerario
  }

  static async obtenerLugarItinerarioPorId (idLugarItinerario) {
    const [lugarItinerario] = await connectionMySQL.query('select * from lugar_itinerario where id_Lugar_Itinerario = ?;', [idLugarItinerario])
    if (lugarItinerario.length === 0) return false

    return lugarItinerario[0]
  }

  static async obtenerPrimerLugarItinerarioSinVisitar (idItinerario) {
    const [lugarItinerario] = await connectionMySQL.query('select id_Lugar_Itinerario as ID, itinerario.Nombre as Itinerario, lugar_itinerario.Estado as "Estado Lugar", lugar.id_Lugar as "ID lugar", Posicion as "Posición en itinerario", MetodoTransporte as "Metodo de transporte" from lugar_itinerario INNER JOIN lugar ON lugar_itinerario.id_Lugar = lugar.id_Lugar INNER JOIN itinerario ON lugar_itinerario.id_Itinerario = itinerario.id_Itinerario where lugar_itinerario.id_Itinerario = ? AND lugar_itinerario.Estado = "S" order by Posicion desc', [idItinerario])

    if (lugarItinerario.length === 0) return false

    return lugarItinerario[0]
  }

  static async crearLugarItinerario ({ entrada }) {
    const {
      id_Lugar: idLugar, id_Itinerario: idItinerario, MetodoTransporte
    } = entrada

    try {
      const [lugaresItinerario] = await connectionMySQL.query('select * from lugar_itinerario where id_Itinerario = ? order by Posicion desc;', [idItinerario])
      let establecerPosicion = 0
      if (lugaresItinerario.length !== 0) {
        establecerPosicion = lugaresItinerario[0].Posicion + 1
      }

      await connectionMySQL.query('insert into lugar_itinerario (id_Lugar, id_Itinerario, MetodoTransporte, Posicion) values(?, ?, ?, ?);', [idLugar, idItinerario, MetodoTransporte, establecerPosicion])
    } catch (error) {
      throw new Error(error)
    }

    return 'Lugar de Itinerario creado con éxito'
  }

  static async eliminarLugarItinerario (idLugarItinerario) {
    try {
      await connectionMySQL.query('delete from lugar_itinerario where id_Lugar_Itinerario = ?', [idLugarItinerario])
    } catch (error) {
      throw new Error(error)
    }

    return 'Lugar itinerario eliminado con éxito'
  }

  static async editarLugarItinerario ({ entrada }) {
    const {
      id_Lugar_Itinerario: idLugarItinerario, MetodoTransporte, Posicion
    } = entrada

    try {
      await connectionMySQL.query('Update lugar_itinerario set Posicion = ?, MetodoTransporte = ? where id_Lugar_Itinerario = ?', [Posicion, MetodoTransporte, idLugarItinerario])
    } catch (error) {
      throw new Error(error)
    }

    return 'Lugar itinerario actualizado con éxito'
  }

  static async editarEstadoLugarItinerario ({ entrada }) {
    const {
      id_Lugar_Itinerario: idLugarItinerario, Estado
    } = entrada

    try {
      await connectionMySQL.query('Update lugar_itinerario set Estado = ? where id_Lugar_Itinerario = ?', [Estado, idLugarItinerario])
    } catch (error) {
      throw new Error(error)
    }

    return 'Estado del Lugar itinerario actualizado con éxito'
  }
}
