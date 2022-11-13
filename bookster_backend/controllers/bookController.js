//imports
const Book = require('../models/books')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

const booksRouter = require('express').Router()

//subir un libro a la base de datos
booksRouter.post('/', async (request, response) => {

    //comparamos el token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if(!user){
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    try {

      //creamos el documento del nuevo libro y lo guardamos en la base de datos
      const book = new Book({
        title: request.body.title,
        author: request.body.author,
        comments: request.body.comments,
        image: request.body.image,
        resume: request.body.resume,
        document: request.body.pdf,
        likes: {
          number: request.body.likes,
          users:[]
        }
      })
  
      const savedBook = await book.save()
  
      response
        .send({ title: savedBook.title, 
                author: savedBook.author, 
                id: savedBook._id, 
                image: savedBook.image, 
                resume: savedBook.resume, 
                likes: savedBook.likes, 
                document: savedBook.document, 
                comments: savedBook.comments 
        })
  
    }catch(error) {
      response.status(500).json({error: error})
    }
    
  })

  //eliminar libro de la base de datos
  booksRouter.delete('/:book', async (request, response) => {

    try {
      //comparamos el token
      const decodedToken = jwt.verify(request.token, process.env.SECRET)

      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

      const user = await User.findById(decodedToken.id)

      if(!user){
        return response.status(401).json({ error: 'token missing or invalid' })
      }
  
      const book = request.params.book

      await Book.findOneAndDelete({title: {$eq: book}})
  
      response
        .status(200)
        .send({ msg: 'Deleted'})
  
    }catch(error) {
      response.json({error: error})
    }
    
  })



  //conseguir los libros de un usuario
  booksRouter.get('/my/:user', async (request, response) => {

      try {
    
        const userName = request.params.user

        //creamos el documento del nuevo libro y lo guardamos en la base de datos
        const myBooks = await Book.aggregate([
          {
            $match : { 
                "author": { $eq : userName } 
              }
          },{
            $lookup: {
              from: 'booksterusers',
              localField: 'author',
              foreignField: 'username',
              as: 'user'
            }
          },{
            $unwind: {
              path: "$user"
            }
          },{
            $project: {
              user: {
                username: 1,
                name: 1,
                image: 1,
              },
              title: 1,
              comments: 1,
              likes: 1,
              image: 1
            }
          }
        ]).sort({_id: -1})

        if (myBooks.length <= 0){
          response
          .status(500)
          .json({error: 'Usuario no encontrado'})
        }
    
        response
          .json(myBooks)
    
      }catch(error) {
        logger.error(error)
      }
      
    })


    //conseguir un libro 
    booksRouter.get('/book/:title', async (request, response) => {

      try {
    
        const bookTitle = request.params.title

        //creamos el documento del nuevo libro y lo guardamos en la base de datos
        const bookOne = await Book.aggregate([
          {
            $match : { 
                "title": { $eq : bookTitle } 
              }
          },{
            $lookup: {
              from: 'booksterusers',
              localField: 'author',
              foreignField: 'username',
              as: 'user'
            }
          },{
            $unwind: {
              path: "$user"
            }
          }
        ])

        if (bookOne.length <= 0){
          response
          .status(500)
          .json({error: 'Libro no encontrado'})
        }
    
        response
          .status(200)
          .json(bookOne[0])
    
      }catch(error) {
        logger.error(error)
      }
      
    })



    //conseguir ultimos libros
    booksRouter.get('/last', async (request, response) => {

      try {
        //creamos el documento del nuevo libro y lo guardamos en la base de datos
        const lastBooks = await Book.aggregate([
          {
            $lookup: {
              from: 'booksterusers',
              localField: 'author',
              foreignField: 'username',
              as: 'user'
            }
          },{
            $unwind: {
              path: "$user"
            }
          }
        ]).sort({_id: -1}).limit(10)

        console.log(lastBooks)
    
        response
          .status(200)
          .json(lastBooks)
    
      }catch(error) {
        response.json({error: error})
      }
      
    })



    //darle like a un libro
    booksRouter.put('/like/:libro', async (request, response) => {

      try {

        //comparamos el token
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        if(!user){
          return response.status(401).json({ error: 'token missing or invalid' })
        }
    

        const libro = request.params.libro

        //creamos el documento del nuevo libro y lo guardamos en la base de datos
        const bookOld = await Book.findOne({title: {$eq: libro}})

        let eq = false

        if (bookOld.likes.users.length !== 0){
          bookOld.likes.users.forEach(user => {
            if (user === request.body.name){
              eq = true
            }
          })
        }

        let book
        if(eq){
          let bookLikes = bookOld.likes.users
          let newLikes = bookLikes.filter(user => user !== request.body.name)
          book = bookOld
          book.likes.users = newLikes
          book.likes.number--
        
        }else{
          book = bookOld
          book.likes.users.push(request.body.name)
          book.likes.number++
        }
        console.log(eq)


        const likeBook = await Book.findOneAndUpdate({title: {$eq: libro}}, book, {returnDocument: "after"})

        console.log(likeBook)
    
        if (eq){
          response
          .status(200)
          .json({correct: false})
        }else{
          response
          .status(200)
          .json({correct: true})
        }
    
      }catch(error) {
        response.json({error: error})
      }
      
    })


    booksRouter.put('/comment/:libro', async (request, response) => {

      try {

        //comparamos el token
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        if(!user){
          return response.status(401).json({ error: 'token missing or invalid' })
        }
    

        const libro = request.params.libro

        //creamos el documento del nuevo libro y lo guardamos en la base de datos
        const bookOld = await Book.findOne({title: {$eq: libro}})

        const comment ={
          username: request.body.user,
          text:  request.body.comment
        }

        bookOld.comments.push(comment)

        await Book.findOneAndUpdate({title: {$eq: libro}}, bookOld, {returnDocument: "after"})

        const commentBook = await Book.aggregate([
          {
            $match : { 
                "title": { $eq : libro } 
              }
          },{
            $lookup: {
              from: 'booksterusers',
              localField: 'author',
              foreignField: 'username',
              as: 'user'
            }
          },{
            $unwind: {
              path: "$user"
            }
          }
        ])

        console.log(commentBook)
    
        response.json(commentBook[0])
        
    
      }catch(error) {
        response.json({error: error})
      }
      
    })
    
    
    booksRouter.get('/search', async (request, response) => {

      try {
        const books = await Book.aggregate([
          {
            $project: {
              title: 1,
              image: 1,
              author: 1
            }
          }
        ]).limit(10)

        console.log(books)
    
        response.json(books)
        
    
      }catch(error) {
        response.json({error: error})
      }
      
    })


    booksRouter.get('/search/:name', async (request, response) => {

      try {
        const name = request.params.name

        const books = await Book.aggregate([
          {
            $match : { 
                "title": { $regex: name, $options: 'i' }
              }
          },{
            $project: {
              title: 1,
              image: 1,
              author: 1
            }
          }
        ])

        console.log(books)
    
        response.json(books)
        
    
      }catch(error) {
        response.json({error: error})
      }
      
    })
  
  
  module.exports = booksRouter