import { connectionMySQL } from '../../helpers/connectionMySQL.js'

export class LugarFavoritoModel {
  static async obtenerTodosLosLugaresFavoritos (idTurista) {
    const [lugaresFavoritos] = await connectionMySQL.query('select id_Lugar_Favorito, lugar.id_Lugar as "ID LUGAR", lugar.Nombre as NombreLugar from lugar_favorito INNER JOIN lugar ON lugar_favorito.id_Lugar = lugar.id_Lugar where lugar_favorito.id_Turista = ?', [idTurista])

    return lugaresFavoritos
  }

  static async obtenerLugarFavoritoPorId (idLugarFavorito) {
    const [lugarFavorito] = await connectionMySQL.query('select id_Lugar_Favorito, id_Lugar, id_Turista from lugar_favorito where id_Lugar_Favorito = ?;', [idLugarFavorito])
    if (lugarFavorito.length === 0) return false

    return lugarFavorito[0]
  }

  static async obtenerLugarFavoritoPorIdLugarDeUnTurista ({ entrada }) {
    const {
      id_Lugar: idLugar, id_Turista: idTurista
    } = entrada

    const [lugarFavorito] = await connectionMySQL.query('select id_Lugar_Favorito, id_Lugar, id_Turista from lugar_favorito where id_Lugar = ? and id_Turista = ?;', [idLugar, idTurista])

    if (lugarFavorito.length === 0) return false

    return lugarFavorito[0]
  }

  static async crearLugarFavorito ({ entrada }) {
    const {
      id_Lugar: idLugar, id_Turista: idTurista
    } = entrada

    try {
      await connectionMySQL.query('insert into lugar_favorito (id_Lugar, id_Turista) values(?, ?);', [idLugar, idTurista])
    } catch (error) {
      throw new Error(error)
    }

    return 'Lugar favorito creado con éxito'
  }

  static async eliminarLugarFavorito (idLugarFavorito) {
    try {
      await connectionMySQL.query('delete from lugar_favorito where id_Lugar_Favorito = ?', [idLugarFavorito])
    } catch (error) {
      throw new Error(error)
    }

    return 'Lugar favorito eliminado con éxito'
  }
}
