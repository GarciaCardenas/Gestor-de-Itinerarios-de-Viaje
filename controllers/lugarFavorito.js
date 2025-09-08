export class LugarFavoritoController {
  constructor (Modelos) {
    this.lugarFavoritoModel = Modelos.LugarFavoritoModel
    this.lugarModel = Modelos.LugarModel
  }

  obtenerTodosLosLugaresFavoritos = async (req, res) => {
    const lugaresFavoritos = await this.lugarFavoritoModel.obtenerTodosLosLugaresFavoritos(req.body.idTurista)
    res.json(lugaresFavoritos)
  }

  obtenerLugarFavoritoPorId = async (req, res) => {
    const { id } = req.params

    const lugarFavorito = await this.lugarFavoritoModel.obtenerLugarFavoritoPorId(id)

    if (lugarFavorito) return res.json(lugarFavorito)

    res.status(404).json({ message: 'Lugar no encontrado' })
  }

  obtenerLugarFavoritoPorIdLugarDeUnTurista = async (req, res) => {
    const { id_Lugar, id_Turista } = req.body

    const lugarFavorito = await this.lugarFavoritoModel.obtenerLugarFavoritoPorIdLugarDeUnTurista({ entrada: { id_Lugar, id_Turista } })

    if (lugarFavorito) return res.json(lugarFavorito)

    res.status(404).json({ message: 'Este lugar no está marcado como favorito' })
  }

  crearLugarFavorito = async (req, res) => {
    const { id_Lugar, Nombre, id_Turista } = req.body

    const existeLugarFavorito = await this.lugarFavoritoModel.obtenerLugarFavoritoPorIdLugarDeUnTurista({ entrada: { id_Lugar, id_Turista } })

    if (existeLugarFavorito) {
      const resultado = await this.lugarFavoritoModel.eliminarLugarFavorito(existeLugarFavorito.id_Lugar_Favorito)
      return res.json(resultado)
    }

    let existeLugar = await this.lugarModel.obtenerLugarPorId(id_Lugar)

    if (!existeLugar) {
      existeLugar = await this.lugarModel.crearLugar({ entrada: { id_Lugar, Nombre } })
    }

    const nuevoLugarFavorito = await this.lugarFavoritoModel.crearLugarFavorito({ entrada: { id_Lugar, id_Turista } })
    res.json(nuevoLugarFavorito)
  }

  eliminarLugarFavorito = async (req, res) => {
    const { id_Lugar, id_Turista } = req.body

    const existeLugarFavorito = await this.lugarFavoritoModel.obtenerLugarFavoritoPorIdLugarDeUnTurista({ entrada: { id_Lugar, id_Turista } })

    if (existeLugarFavorito) {
      const resultado = await this.lugarFavoritoModel.eliminarLugarFavorito(existeLugarFavorito.id_Lugar_Favorito)
      return res.json(resultado)
    }

    res.status(404).json({ message: 'Lugar Favorito no encontrado' })
  }
}
