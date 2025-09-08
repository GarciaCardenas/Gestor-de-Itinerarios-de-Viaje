export class LugarItinerarioController {
  constructor (Modelos) {
    this.lugarItinerarioModel = Modelos.LugarItinerarioModel
    this.lugarModel = Modelos.LugarModel
  }

  obtenerLugaresPorItinerario = async (req, res) => {
    const lugaresItinerario = await this.lugarItinerarioModel.obtenerLugaresPorItinerario(req.body.id_Itinerario)
    res.json(lugaresItinerario)
  }

  obtenerLugarItinerarioPorId = async (req, res) => {
    const { id } = req.params

    const lugarItinerario = await this.lugarItinerarioModel.obtenerLugarItinerarioPorId(id)

    if (lugarItinerario) return res.json(lugarItinerario)

    res.status(404).json({ message: 'No se encontró un lugar con ese ID en el itinerario' })
  }

  obtenerPrimerLugarItinerarioSinVisitar = async (req, res) => {
    const lugaresItinerario = await this.lugarItinerarioModel.obtenerPrimerLugarItinerarioSinVisitar(req.body.id_Itinerario)
    res.json(lugaresItinerario)
  }

  crearLugarItinerario = async (req, res) => {
    const { id_Lugar, Nombre } = req.body
    console.log(req.body)

    let existeLugar = await this.lugarModel.obtenerLugarPorId(id_Lugar)

    if (!existeLugar) {
      existeLugar = await this.lugarModel.crearLugar({ entrada: { id_Lugar, Nombre } })
    }

    const nuevoItinerario = await this.lugarItinerarioModel.crearLugarItinerario({ entrada: req.body })

    res.send(nuevoItinerario)
  }

  eliminarLugarItinerario = async (req, res) => {
    const resultado = await this.lugarItinerarioModel.eliminarLugarItinerario(req.body.id_Lugar_Itinerario)

    res.status(200).json({ message: `${resultado}` })
  }

  editarLugarItinerario = async (req, res) => {
    const resultado = await this.lugarItinerarioModel.editarLugarItinerario({ entrada: req.body })

    res.status(200).json({ message: `${resultado}` })
  }

  editarEstadoLugarItinerario = async (req, res) => {
    const resultado = await this.lugarItinerarioModel.editarEstadoLugarItinerario({ entrada: req.body })

    res.status(200).json({ message: `${resultado}` })
  }
}
