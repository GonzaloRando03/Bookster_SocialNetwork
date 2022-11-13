//imports
const app = require('./app') // la aplicación Express real
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

//creamos servidor
const server = http.createServer(app)

//escuchamos por el puerto guardado en las variables de entorno
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})