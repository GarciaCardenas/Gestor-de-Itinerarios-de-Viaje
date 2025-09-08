export class QuejaController {
  constructor (Modelos) {
    this.quejaModel = Modelos.QuejaModel
  }

  obtenerQuejas = async (req, res) => {
    const quejas = await this.quejaModel.obtenerQuejas(req.body.idTurista)
    res.json(quejas)
  }

  obtenerQuejaPorId = async (req, res) => {
    const { id_Turista, id_Queja } = req.body
    const queja = await this.quejaModel.obtenerQuejaPorId({ entrada: { id_Turista, id_Queja } })

    if (queja) return res.json(queja)

    res.status(404).json({ message: 'Queja no encontrada' })
  }

  crearQueja = async (req, res) => {
    const { id_Turista, categoria, comentario } = req.body
    const queja = await this.quejaModel.crearQueja({ entrada: { id_Turista, categoria, comentario } })
    res.json(queja)
  }
}
