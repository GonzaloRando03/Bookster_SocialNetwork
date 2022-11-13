//importamos mongoose
const mongoose = require('mongoose')

//creamos el schema para el usuario
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Nombre de usuario requerido para crear un objeto"]
  },
  name: {
    type: String,
    required: [true, "Nombre requerido para crear un objeto"]
  },
  passwordHash: {
    type: String,
    required: [true, "Password requerido para crear un objeto"]
  },
  description: String,
  followers: {
    number:Number,
    users: [String]
  },
  image: mongoose.Schema.Types.Mixed
})

//formateamos el modelo del json que mandamos al frontend
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // no podemos mostrar el hash de la contraseña
    delete returnedObject.passwordHash
  }
})

//creamos el modelo
const User = mongoose.model('booksterusers', userSchema)

module.exports = User