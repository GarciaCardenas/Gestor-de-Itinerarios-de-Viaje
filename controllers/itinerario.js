export class ItinerarioController {
  constructor (Modelos) {
    this.itinerarioModel = Modelos.ItinerarioModel
  }

  obtenerItinerariosPorTurista = async (req, res) => {
    const itinerarios = await this.itinerarioModel.obtenerItinerariosPorTurista(req.body.id_Turista)
    res.json(itinerarios)
  }

  obtenerItinerarioPorId = async (req, res) => {
    const { id } = req.params

    const itinerario = await this.itinerarioModel.obtenerItinerarioPorId(id)

    if (itinerario) return res.json(itinerario)

    res.status(404).json({ message: 'Itinerario no encontrado' })
  }

  crearItinerario = async (req, res) => {
    const nuevoItinerario = await this.itinerarioModel.crearItinerario({ entrada: req.body })

    res.send(nuevoItinerario)
  }

  eliminarItinerario = async (req, res) => {
    const resultado = await this.itinerarioModel.eliminarItinerario(req.body.id_Itinerario)

    res.status(200).json({ message: `${resultado}` })
  }

  editarEstadoItinerario = async (req, res) => {
    const resultado = await this.itinerarioModel.editarEstadoItinerario({ entrada: req.body })

    res.status(200).json({ message: `${resultado}` })
  }
}
