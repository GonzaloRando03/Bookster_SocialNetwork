//importaciones de librerias
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

//importaciones propias
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const userRouter = require('./controllers/userController')
const loginRouter = require('./controllers/loginController')
const booksRouter = require('./controllers/bookController')


const app = express()

//limite de tamaño de archivos
app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 100000}))

//conectamos a la base de datos
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to Database')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })


//usamos cors y expres json para que nuestro servidor pueda ser funcional
app.use(cors())
app.use(express.json())

//middleware del logger y el extractor del token que se deben añadir antes que los controllers para que funcionen correctamente
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

//usamos los controllers
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/books', booksRouter)


//gestion de errores desde el middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app