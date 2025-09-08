import express, { json } from 'express' // require -> commonJS
import cors from "cors";
import 'dotenv/config'

import { corsMiddleware } from './middlewares/cors.js'
import { soloAdmin, soloPublico } from './middlewares/authorization.js'
import cookieParser from 'cookie-parser'
import { AuthenticatorRouter } from './routes/authenticator.js'
import { UsuarioTuristaRouter } from './routes/usuarioTurista.js'
import { LugarRouter } from './routes/lugar.js'
import { LugarFavoritoRouter } from './routes/lugarFavorito.js'
import { ItinerarioRouter } from './routes/itinerario.js'
import { LugarItinerarioRouter } from './routes/lugarItinerario.js'
import { LugarVisitadoRouter } from './routes/lugarVisitado.js'
import { QuejaRouter } from './routes/queja.js'

import { DelateRouter } from './routes/deleteUsuarioRoute.js'
import { UpdateUsuarioRouter } from './routes/UpdateUsuarioRoute.js'

// Imports para __dirname
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const crearApp = (Modelos) => {
  const app = express()
  app.use(json())
  app.use(cors())
  app.use(cookieParser())

  app.disable('x-powered-by')

  app.use('/api/authenticator', AuthenticatorRouter(Modelos))
  app.use('/api/usuarioTurista', UsuarioTuristaRouter(Modelos))
  app.use('/api/lugar', LugarRouter(Modelos))
  app.use('/api/lugarFavorito', LugarFavoritoRouter(Modelos))
  app.use('/api/itinerario', ItinerarioRouter(Modelos))
  app.use('/api/lugarItinerario', LugarItinerarioRouter(Modelos))
  app.use('/api/lugarVisitado', LugarVisitadoRouter(Modelos))
  app.use('/api/queja', QuejaRouter(Modelos))

  app.use('/api/deleteUsuario', DelateRouter(Modelos))
  app.use('/api/updateUsuario', UpdateUsuarioRouter(Modelos))

  // Rutas del sitio web estático
  app.use(express.static(__dirname + '/public'))
  // Pruebas de backend
  app.get('/recuperarContrasena', soloPublico, (req, res) => res.sendFile(__dirname + '/pages/cambiar_contraseña.html'))
  app.get('/', soloPublico, (req, res) => res.sendFile(__dirname + '/pages/login_ES.html'))
  app.get('/registrar', soloPublico, (req, res) => res.sendFile(__dirname + '/pages/registro_turista_ES.html'))
  app.get('/admin', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/admin/admin.html'))
  app.get('/inicio', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/inicio.html'))
  app.get('/MisFavoritos', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/MisFavoritos.html'))
  app.get('/cuenta_verificada', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/Cuenta_verificada.html'))
  app.get('/perfilTurista', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/perfilTurista.html'))
  app.get('/recuperacion', soloPublico, (req, res) => res.sendFile(__dirname + '/pages/recuperacion_de_cuenta_ES.html'))
  app.get('/cuenta_creada', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/cuenta_creada.html'))
  app.get('/aventuras_proximas', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/Aventuras_proximas.html'))
  app.get('/aventuras_pasadas', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/aventuras_pasadas.html'))

  app.get('/cuentas', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/cuentas.html'))
  app.get('/crear_usuario', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/crearUsuario.html'))
  app.get('/crear_empresa', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/crearEmpresa.html'))
  app.get('/actualizar', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/updateAdministrador.html'))

  app.get('/editar_aventura', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/editarAventura.html'))
  app.get('/FormularioQuejas', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/FormularioQuejas.html'))
  app.get('/EnCurso', soloAdmin, (req, res) => res.sendFile(__dirname + '/pages/AventuraEnCurso.html'))
  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}