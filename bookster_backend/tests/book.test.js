//imports necesarios
const mongoose = require('mongoose')
const supertest = require('supertest')

//variables de entorno
require('dotenv').config()

//creamos la api de supertest
const app = require('../app')
const api = supertest(app)


describe('User test',  () => {

  //objeto de usuario
  const book = {
    title: 'titulolibropruebajest',
    author: 'authorprueba',
    comments: [],
    image: 'imagen de prueba',
    resume: 'resumen del libro',
    pdf: 'documento de prueba',
    likes: 0
  }

  //objeto de usuario que debe fallar
  const badBook = {
    author: 'authorprueba',
    comments: [],
    image: 'imagen de prueba',
    resume: 'resumen del libro',
    pdf: 'documento de prueba',
    likes: 0
  }


  const libroExistente = 'Librobueno'
  

  const config = {
        Authorization: `bearer ${process.env.TOKENUSER}`,
    }




  test('Crear libro erroneo', async () => {
    await api
      .post('/api/books')
      .set(config)
      .send(badBook)
      .expect(500)
      .expect('Content-Type', /application\/json/)
  })


  test('Crear libro correcto y devuelve json', async () => {
    await api
      .post('/api/books')
      .set(config)
      .send(book)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('Conseguir libros de un usuario', async () => {
    const response = await api.get('/api/books/my/gonzalo').set(config)
    expect(response.body[0].user.username).toBeDefined()
    expect(response.body[0].user.username).toBe('gonzalo')
  })


  test('Error al pedir libros de un usuario que no exista', async () => {
    await api
      .get('/api/books/my/usuarioinexistente')
      .set(config)
      .expect(500)
      .expect('Content-Type', /application\/json/)
  })


  test('Conseguir un libro concreto', async () => {
    const response = await api.get(`/api/books/book/${libroExistente}`).set(config)
    expect(response.body.title).toBeDefined()
    expect(response.body.title).toBe(libroExistente)
  })


  test('Error al pedir libro que no exista', async () => {
    await api
      .get('/api/books/book/libroinexistente')
      .set(config)
      .expect(500)
      .expect('Content-Type', /application\/json/)
  })


  test('Eliminar libro', async () => {
    const response = await api.delete('/api/books/titulolibropruebajest').set(config)
    expect(response.body.msg).toBeDefined()
    expect(response.body.msg).toBe('Deleted')
  })


  test('Conseguir ultimos libros', async () => {
    await api
      .get('/api/books/last')
      .set(config)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('Dar like a un libro', async () => {
    const response = await api.put(`/api/books/like/${libroExistente}`).set(config).send({name: 'nombreprueba'})
    expect(response.body.correct).toBeDefined()
    expect(response.body.correct).toBe(true)
  })


  test('Quitar like a un libro', async () => {
    const response = await api.put(`/api/books/like/${libroExistente}`).set(config).send({name: 'nombreprueba'})
    expect(response.body.correct).toBeDefined()
    expect(response.body.correct).toBe(false)
  })

  test('Busqueda', async () => {
    const response = await api.get(`/api/books/search/${libroExistente}`).set(config)
    expect(response.body[0].title).toBeDefined()
    expect(response.body[0].title).toBe(libroExistente)
  })

})

//cuando acabamos cerramos la conexión con la base de datos.
afterAll(async () => {
  await mongoose.connection.close()
})