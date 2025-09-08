// UpdateUsuarioController.js
export class UpdateUsuarioController {
  constructor (Modelos) {
    this.UpdateUsuarioModel = Modelos.UpdateUsuarioModel
  }

  actualizarNombre = async (req, res) => {
    try {
      const { id } = req.params
      const { Nombre } = req.body

      const updateName = await this.UpdateUsuarioModel.actualizarNombre({ id, Nombre })
      res.status(200).json({ message: 'Nombre actualizado con éxito' })
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el nombre', error: error.message })
    }
  }

  actualizarApellido = async (req, res) => {
    try {
      const { id } = req.params
      const { Apellido } = req.body
      await this.UpdateUsuarioModel.actualizarApellido({ id, Apellido })
      res.status(200).json({ message: 'Apellido actualizado con éxito' })
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el apellido', error: error.message })
    }
  }

  actualizarCorreo = async (req, res) => {
    try {
      const { id } = req.params
      const { Correo } = req.body

      await this.UpdateUsuarioModel.actualizarCorreo({ id, Correo })
      res.status(200).json({ message: 'Correo actualizado con éxito' })
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el correo', error: error.message })
    }
  }

  actualizarFechaNacimiento = async (req, res) => {
    try {
      const { id } = req.params
      const { Fecha_Nacimiento } = req.body
      await this.UpdateUsuarioModel.actualizarFechaNacimiento({ id, Fecha_Nacimiento })
      res.status(200).json({ message: 'Fecha de nacimiento actualizada con éxito' })
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la fecha de nacimiento', error: error.message })
    }
  }
}
