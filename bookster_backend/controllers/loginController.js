//imports 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
//imports locales
const User = require('../models/users')

const loginRouter = require('express').Router()


loginRouter.post('/', async (request, response) => {
  const body = request.body

  //buscamos el usuario en la base de datos y comprobamos la contraseña
  const user = await User.findOne({ username: body.username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  //formateamos el usuario para hacer el token
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  //creamos el token del usuario
  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id, image: user.image, description: user.description, followers: user.followers })
})

module.exports = loginRouter
