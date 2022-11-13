//imports necesarios
const mongoose = require('mongoose')
const supertest = require('supertest')

//variables de entorno
require('dotenv').config()

//creamos la api de supertest
const app = require('../app')
const api = supertest(app)


describe('Login test',  () => {

  //objeto de usuario
  const user = {
    username: process.env.USERNAMESEND,
    password: process.env.PASSWORDSEND
  }

  //objeto de usuario que debe fallar
  const badUser = {
    username: process.env.USERNAMESEND,
    password: 'mondongo'
  }


  test('Login correcto y devuelve json', async () => {
    await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Login correcto y devuelve token', async () => {
    const response = await api.post('/api/login').send(user)
    expect(response.body.token).toBeDefined()

  })

  test('Login incorrecto y devuelve json y unauthoriced', async () => {
    await api
      .post('/api/login')
      .send(badUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('Login incorrecto y devuelve error', async () => {
    const response = await api.post('/api/login').send(badUser)
    expect(response.body.error).toBeDefined()

  })
})

//cuando acabamos cerramos la conexión con la base de datos.
afterAll(async () => {
  await mongoose.connection.close()
})