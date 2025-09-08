export class UsuarioTuristaController {
  constructor (Modelos) {
    this.usuarioTuristaModel = Modelos.UsuarioTuristaModel
  }

  obtenerTodosLosUsuarios = async (req, res) => {
    const usuariosTuristas = await this.usuarioTuristaModel.obtenerTodosLosUsuarios()
    res.json(usuariosTuristas)
  }

  obtenerUsuarioTuristaPorCorreo = async (req, res) => {
    const { Correo } = req.params

    const usuarioTurista = await this.usuarioTuristaModel.obtenerUsuarioTuristaPorCorreo(Correo)

    if (usuarioTurista) return res.json(usuarioTurista)

    res.status(404).json({ message: 'Usuario turista no encontrado' })
  }

  obtenerUsuarioTuristaPorId = async (req, res) => {
    const { id } = req.params

    const usuarioTuristaid = await this.usuarioTuristaModel.obtenerUsuarioTuristaPorId(id)

    if (usuarioTuristaid) return res.json(usuarioTuristaid)

    res.status(404).json({ message: 'Usuario turista no encontrado' })
  }

  cambiarContraseña = async (req, res) => {
    const usuarioEditado = await this.usuarioTuristaModel.cambiarContraseña({ entrada: req.body })

    if (typeof usuarioEditado === 'string') {
      return res.send({ status: 401, error: usuarioEditado })
    }

    res.send({ status: 201, message: `Usuario ${usuarioEditado.Nombre} editado con éxito` })
  }
}
