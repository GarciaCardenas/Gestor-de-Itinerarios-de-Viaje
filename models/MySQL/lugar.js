import { connectionMySQL } from '../../helpers/connectionMySQL.js'

export class LugarModel {
  static async obtenerTodosLosLugares () {
    const [lugares] = await connectionMySQL.query('select * from lugar')

    return lugares
  }

  static async obtenerLugarPorId (idLugar) {
    const [lugar] = await connectionMySQL.query('select * from lugar where id_Lugar = ?;', [idLugar])
    if (lugar.length === 0) return false

    return lugar[0]
  }

  static async crearLugar ({ entrada }) {
    const {
      id_Lugar: idLugar, Nombre
    } = entrada

    const existeLugar = await this.obtenerLugarPorId(idLugar)

    if (existeLugar !== false) return 'Ya existe un lugar con ese id'

    try {
      await connectionMySQL.query('insert into lugar (id_Lugar, Nombre) values(?, ?);', [idLugar, Nombre])
      const [lugarCreado] = await connectionMySQL.query('select * from lugar where id_Lugar = ?;', [idLugar])
      return lugarCreado[0]
    } catch (error) {
      throw new Error(error)
    }
  }
}
