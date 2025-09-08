export class LugarController {
  constructor (Modelos) {
    this.lugarModel = Modelos.LugarModel
  }

  obtenerTodosLosLugares = async (req, res) => {
    const lugares = await this.lugarModel.obtenerTodosLosLugares()
    res.json(lugares)
  }

  obtenerLugarPorId = async (req, res) => {
    const { id } = req.params

    const lugar = await this.lugarModel.obtenerLugarPorId(id)

    if (lugar) return res.json(lugar)

    res.status(404).json({ message: 'Lugar no encontrado' })
  }

  crearLugar = async (req, res) => {
    const nuevoLugar = await this.lugarModel.crearLugar({ entrada: req.body })

    res.send(nuevoLugar)
  }
}
