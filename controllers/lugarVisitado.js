export class LugarVisitadoController {
  constructor (Modelos) {
    this.lugarVisitadoModel = Modelos.LugarVisitadoModel
    this.lugarModel = Modelos.LugarModel
  }

  obtenerTodosLosLugaresVisitados = async (req, res) => {
    const lugaresVisitados = await this.lugarVisitadoModel.obtenerTodosLosLugaresVisitados(req.body.idTurista)
    res.json(lugaresVisitados)
  }

  obtenerLugarVisitadoPorId = async (req, res) => {
    const { id } = req.params

    const lugarVisitado = await this.lugarVisitadoModel.obtenerLugarVisitadoPorId(id)

    if (lugarVisitado) return res.json(lugarVisitado)

    res.status(404).json({ message: 'Lugar Visitado no encontrado' })
  }

  obtenerLugarVisitadoPorIdLugarDeUnTurista = async (req, res) => {
    const { id_Lugar, id_Turista } = req.body

    const lugarVisitado = await this.lugarVisitadoModel.obtenerLugarVisitadoPorIdLugarDeUnTurista({ entrada: { id_Lugar, id_Turista } })

    if (lugarVisitado) return res.json(lugarVisitado)

    res.status(404).json({ message: 'Este lugar no está marcado como visitado' })
  }

  crearLugarVisitado = async (req, res) => {
    const { id_Lugar, Nombre, id_Turista } = req.body

    const existeLugarVisitado = await this.lugarVisitadoModel.obtenerLugarVisitadoPorIdLugarDeUnTurista({ entrada: { id_Lugar, id_Turista } })

    if (existeLugarVisitado) {
      const resultado = await this.lugarVisitadoModel.eliminarLugarVisitado(existeLugarVisitado.id_Lugar_Visitado)
      return res.json(resultado)
    }

    let existeLugar = await this.lugarModel.obtenerLugarPorId(id_Lugar)

    if (!existeLugar) {
      existeLugar = await this.lugarModel.crearLugar({ entrada: { id_Lugar, Nombre } })
    }

    const nuevoLugarVisitado = await this.lugarVisitadoModel.crearLugarVisitado({ entrada: { id_Lugar, id_Turista } })
    res.json(nuevoLugarVisitado)
  }

  eliminarLugarVisitado = async (req, res) => {
    const { id_Lugar, id_Turista } = req.body

    const existeLugarVisitado = await this.lugarVisitadoModel.obtenerLugarVisitadoPorIdLugarDeUnTurista({ entrada: { id_Lugar, id_Turista } })

    if (existeLugarVisitado) {
      const resultado = await this.lugarVisitadoModel.eliminarLugarVisitado(existeLugarVisitado.id_Lugar_Visitado)
      return res.json(resultado)
    }

    res.status(404).json({ message: 'Lugar Visitado no encontrado' })
  }
}
