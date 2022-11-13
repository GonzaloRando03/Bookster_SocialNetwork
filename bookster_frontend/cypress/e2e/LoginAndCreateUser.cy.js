import 'cypress-file-upload'

//prueba del login y creacion de usuario
describe('Prueba del login y crear usuario', () => {
  
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('Se muestra el formulario de login', function() {
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
  })

  it('Error al introducir credenciales erroneas', function() {
    cy.get('#username').type('mondongo')
    cy.get('#password').type('mondongo')
    cy.get('#loginButton').click()
    cy.contains('invalid username or password')
  })

  it('Se muestra el formulario de crear usuario', function() {
    cy.get('#createUser').click()
    cy.get('#username')
    cy.get('#password1')
    cy.contains('Register')
  })

  it('Se muestra el error al poner dos contraseñas distintas', function() {
    cy.get('#createUser').click()
    cy.get('#password1').type('holamundo')
    cy.get('#password2').type('holamundos')
    cy.contains('Las contraseñas no son iguales')
  })

  it('Se muestra el error al crear usuario sin foto', function() {
    cy.get('#createUser').click()
    cy.get('#username').type('prueba')
    cy.get('#name').type('prueba')
    cy.get('#password1').type('holamundo')
    cy.get('#password2').type('holamundo')
    cy.get('#createUserButton').click()
    cy.contains('Error al crear el usuario')
  })

  it('Se crea un usuario correctamente', function() {
    cy.get('#createUser').click()
    cy.get('#username').type('prueba')
    cy.get('#name').type('prueba')
    cy.get('#password1').type('holamundo')
    cy.get('#password2').type('holamundo')
    cy.get('#description').type('holamundo descripcion')
    cy.get('#dragAndDropImg').attachFile('prueba.png')
    cy.get('#createUserButton').click()
    cy.contains('Bookster')
  })

  it('Nos logueamos correctamente', function() {
    cy.get('#username').type('prueba')
    cy.get('#password').type('holamundo')
    cy.get('#loginButton').click()
    cy.contains('Bookster')
  })

  it('Nos deslogueamos correctamente', function() {
    cy.get('#username').type('prueba')
    cy.get('#password').type('holamundo')
    cy.get('#loginButton').click()
    cy.get('#me').click()
    cy.contains('Cerrar')
    cy.get('.unlog').click()
  })

})