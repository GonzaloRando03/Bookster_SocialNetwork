//importamos mongoose
const mongoose = require('mongoose')

//creamos el schema para los libros
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  author: String,
  comments: [{
    username: String,
    text: String
  }],
  description: String,
  likes: {
    number:Number,
    users: [String]
  },
  image: mongoose.Schema.Types.Mixed,
  document: mongoose.Schema.Types.Mixed,
  resume: String
})

//formateamos el modelo del json que mandamos al frontend
bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//creamos el modelo
const Book = mongoose.model('booksterbooks', bookSchema)

module.exports = Book