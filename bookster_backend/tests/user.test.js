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
  const user = {
    username: 'usuarioDePruebaJest',
    name:'usuario',
    password: process.env.PASSWORDSEND,
    image: 'imagenfalsa',
    description: 'descripcion',
    followers: 0
  }

  //objeto de usuario que debe fallar
  const badUserName = {
    username: 'u',
    name:'usuario',
    password: process.env.PASSWORDSEND,
    image: 'imagenfalsa',
    description: 'descripcion',
    followers: 0
  }

  const badUserPass = {
    username: 'usuarioDePruebaJest',
    name:'usuario',
    password: '12',
    image: 'imagenfalsa',
    description: 'descripcion',
    followers: 0
  }
  

  const config = {
        Authorization: `bearer ${process.env.TOKENUSER}`,
    }



  test('Crear usuario correcto y devuelve json', async () => {
    await api
      .post('/api/user')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('Borrar usuario correcto y devuelve json', async () => {
    await api
      .delete('/api/user/usuarioDePruebaJest')
      .set(config)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('Crear usuario correcto y devuelve token sin contraseña', async () => {
    const response = await api.post('/api/user').send(user)
    expect(response.body.token).toBeDefined()
    expect(response.body.passwordHash).not.toBeDefined()

  })


  test('Seguir a un usuario correctamente', async () => {
    const response = await api.put('/api/user/follow/gonzalo').send(user)
    expect(response.body.correct).toBe(true)

  })


  test('Dejar de seguir a un usuario', async () => {
    const response = await api.put('/api/user/follow/gonzalo').send(user)
    expect(response.body.correct).toBe(false)

  })


  test('Borrar usuario correcto y devuelve mensaje', async () => {
    const response = await api.delete('/api/user/usuarioDePruebaJest').set(config)
    expect(response.body.msg).toBeDefined()
  })

  test('Crear usuario con contraseña incorrecta', async () => {
    await api
      .post('/api/user')
      .send(badUserPass)
      .expect(500)
      .expect('Content-Type', /application\/json/)
  })


  test('Crear usuario con nombre incorrecto', async () => {
    await api
      .post('/api/user')
      .send(badUserName)
      .expect(500)
      .expect('Content-Type', /application\/json/)
  })


  test('Consultar un usuario en la base de datos correctamenete', async () => {
    const response = await api.get('/api/user/gonzalo')
    expect(response.body.username).toBeDefined()
    expect(response.body.name).toBeDefined()
    expect(response.body.image).toBeDefined()
  })

  test('Consultar un usuario inexistente en la base de datos', async () => {
    await api
        .get('/api/user/nouserexist')
        .expect(500)
        .expect('Content-Type', /application\/json/)
  })
})

//cuando acabamos cerramos la conexión con la base de datos.
afterAll(async () => {
  await mongoose.connection.close()
})