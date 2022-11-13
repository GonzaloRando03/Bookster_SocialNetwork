//imports
const bcrypt = require('bcrypt')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

//creamos el router para los usuarios
const userRouter = require('express').Router()

//subir un nuevo usuario a la base de datos
userRouter.post('/', async (request, response) => {

  //comprobamos que la contraseña y el usuario esten bien
  if (request.body.password.length < 3 || request.body.username.length < 3){
    if (request.body.password.length < 3){
      response.status(500).json({error: 'La contraseña necesita mas de 3 caracteres'})
    }
  
    if (request.body.username.length < 3){
      response.status(500).json({error: 'El nombre de usuario necesita mas de 3 caracteres'})
    }


  }else{
    
    try {
      //ciframos la contraseña del usuario con hash
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(request.body.password, saltRounds)
  
  
      //creamos el documento del nuevo usuario y lo guardamos en la base de datos
      const user = new User({
        username: request.body.username,
        name: request.body.name,
        passwordHash: passwordHash,
        image: request.body.image,
        description: request.body.description,
        followers: {
          number: request.body.followers,
          users: []
        }
      })
  
      const savedUser = await user.save()
  
  
      //formateamos el usuario para hacer el token
      const userForToken = {
        username: savedUser.username,
        id: savedUser._id,
      }
  
  
      //creamos el token del usuario
      const token = jwt.sign(userForToken, process.env.SECRET)
  
      response
        .status(200)
        .send({
          token, 
          username: savedUser.username, 
          name: savedUser.name, 
          id: savedUser._id, 
          image: savedUser.image, 
          description: savedUser.description, 
          followers: savedUser.followers 
        })
  
    } catch (error) {
      response.json({error: error})
    }
  }
})


//manda un usuario concreto de la base de datos
userRouter.get('/:username', async (request, response) => {

  const username = request.params.username

  try {
    const user = await User.aggregate([
      {
        $match: {
          "username": {$eq: username}
        }
      },{
        $project:{
          passwordHash: 0
        }
      }
    ])

    if (user.length <=0){
      response.status(500).json({error: 'Usuario no encontrado'})

    }else{
      response
      .status(200)
      .send(user[0])
    }

  } catch (error) {
    response.status(500).json({error: error})
  }
  
})


//añade o elimina un seguidor de un usuario 
userRouter.put('/follow/:user', async (request, response) => {

  try {
    const user = request.params.user

    //creamos el documento del nuevo libro y lo guardamos en la base de datos
    const userOld = await User.findOne({username: {$eq: user}})

    let eq = false

    //busca si el cliente sigue o no al usuario
    userOld.followers.users.forEach(user => {
      if (user === request.body.name){
        eq = true
      }
    })

    let userNew

    //si lo sigue lo elimina de seguidores, si no, lo añade
    if(eq){
      let userFollowers = userOld.followers.users
      let newFollowers = userFollowers.filter(follower => follower !== request.body.name)
      userNew = userOld
      userOld.followers.number--
      userNew.followers.users = newFollowers
    
    }else{
      userNew = userOld
      userOld.followers.number++
      userNew.followers.users.push(request.body.name)
    }

    //actualiza el nuevo usuario
    const followedUser = await User.findOneAndUpdate({username: {$eq: user}}, userNew, {returnDocument: "after"})

    console.log(followedUser)

    //devuelve un bool dependiendo de si se ha añadido o eliminado un usuario
    if (eq){
      response
      .json({correct: false})
    }else{
      response
      .json({correct: true})
    }

  }catch(error) {
    response.json({error: error})
  }
  
})

//funcion borrar usuario
userRouter.delete('/:user', async (request, response) => {

  try {
    //comparamos el token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    console.log('hasta aqui funciona')

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if(!user){
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const username = request.params.user

    await User.findOneAndDelete({username: {$eq: username}})

    response
      .status(200)
      .send({ msg: 'Deleted'})

  }catch(error) {

    response.json({error: error})
  }
  
})



module.exports = userRouter