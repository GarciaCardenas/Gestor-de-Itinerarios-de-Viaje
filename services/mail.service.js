import Mailjet from 'node-mailjet'

import dotenv from 'dotenv'
dotenv.config()

export const enviarEmailVerificacion = async (direccion, nombre, token) => {
  try {
    const mailjet = new Mailjet({
      apiKey: process.env.MAILJET_API_KEY,
      apiSecret: process.env.MAILJET_API_SECRET
    })
    const resultadoEmail = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_SENDER,
            Name: process.env.MAILJET_SEND_NAME
          },
          To: [
            {
              Email: direccion,
              Name: nombre
            }
          ],
          Subject: 'Verificación de nueva cuenta - TourTales',
          TextPart: 'Verificación de nueva cuenta - TourTales',
          HTMLPart: crearMailVerificacion(token)
        }
      ]
    })

    return resultadoEmail
  } catch (error) {
    console.log('Something went wrong', error.message)
  }
}

export const enviarEmailRecuperarContrasena = async (direccion, nombre, token) => {
  try {
    const mailjet = new Mailjet({
      apiKey: process.env.MAILJET_API_KEY,
      apiSecret: process.env.MAILJET_API_SECRET
    })
    const resultadoEmail = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_SENDER,
            Name: process.env.MAILJET_SEND_NAME
          },
          To: [
            {
              Email: direccion,
              Name: nombre
            }
          ],
          Subject: 'Recuperar contraseña - TourTales',
          TextPart: 'Recuperar contraseña - TourTales',
          HTMLPart: crearMailOlvidarContrasena(token)
        }
      ]
    })

    return resultadoEmail
  } catch (error) {
    console.log('Something went wrong', error.message)
  }
}

const crearMailVerificacion = (token) => {
  return `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación de Cuenta</title>
    <style>
      body {
      font-family: "Montserrat", Arial, Helvetica, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
          display: block;
          width: 60%;
          max-width: 460px;
          min-width: 232px;
          height: fit-content !important;
          margin: 20px auto;
          padding: 20px;
          background-color: #EFEDED;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          color:black;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 15px;
      }
      a.button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #65B2C6;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }
      a.button:hover {
        background-color: #3b6873;
      }
      .logo {
      width: 130px;
      position: relative;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      }
      h1{
          margin: 12px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>TourTales</h1>
      <p>Gracias por registrarte. Para verificar tu cuenta, haz clic en el siguiente botón:</p>
      <a href="https://tourtales.3.us-1.fl0.io/api/authenticator/verificarCuenta/${token}" class="button">Verificar Cuenta</a>
    </div>
  </body>
  </html>`
}

const crearMailOlvidarContrasena = (token) => {
  return `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Correo de nueva contraseña</title>
    <style>
      body {
          font-family: "Montserrat", Arial, Helvetica, sans-serif;
          margin: 0;
          padding: 0;
      }
      .container {
          display: block;
          width: 60%;
          max-width: 460px;
          min-width: 232px;
          height: fit-content !important;
          margin: 20px auto;
          padding: 20px;
          background-color: #EFEDED;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          color:black;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 15px;
      }
      a.button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #65B2C6;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }
      a.button:hover {
        background-color: #3b6873;
      }
      h1{
          margin: 12px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>TourTales</h1>
      <p>Para crear una nueva contraseña, haz clic en el siguiente botón:</p>
      <a href="https://tourtales.3.us-1.fl0.io/api/authenticator/recuperarContrasena/${token}" class="button"><b>Recuperar contraseña</b></a>
    </div>
  </body>
  </html>`
}
