import 'cypress-file-upload'

//prueba de creacion de libros
describe('Creacion de libros', () => {
  
  //nos logueamos antes de emepezar la bateria
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('prueba')
    cy.get('#password').type('holamundo')
    cy.get('#loginButton').click()
    cy.get('#me').click()
  })

  it('Se muestra formulario de crear libro', function() {
    cy.contains('prueba')
    cy.get('#createBook').click()
    cy.contains('Arrastra o selecciona')
  })

  it('Error al crear libro sin documento', function() {
    cy.get('#createBook').click()
    cy.get('#bookTitle').type('LibroPruebaCypress')
    cy.get('#bookResume').type('Resumen de prueba del libro')
    cy.get('#dragAndDropImg').attachFile('prueba.png')
    cy.get('#createBookButton').click()
    cy.contains('Datos incorrectos')
  })

  it('Error al crear libro sin imagen', function() {
    cy.get('#createBook').click()
    cy.get('#bookTitle').type('LibroPruebaCypress')
    cy.get('#bookResume').type('Resumen de prueba del libro')
    cy.get('#dragAndDropPdf').attachFile('prueba.pdf')
    cy.get('#createBookButton').click()
    cy.contains('Datos incorrectos')
  })

  it('Error al crear libro sin titulo', function() {
    cy.get('#createBook').click()
    cy.get('#bookResume').type('Resumen de prueba del libro')
    cy.get('#dragAndDropImg').attachFile('prueba.png')
    cy.get('#dragAndDropPdf').attachFile('prueba.pdf')
    cy.get('#createBookButton').click()
    cy.contains('Datos incorrectos')
  })

  it('Se crea un libro correctamente', function() {
    cy.get('#createBook').click()
    cy.get('#bookTitle').type('LibroPruebaCypress')
    cy.get('#bookResume').type('Resumen de prueba del libro')
    cy.get('#dragAndDropImg').attachFile('prueba.png')
    cy.get('#dragAndDropPdf').attachFile('prueba.pdf')
    cy.get('#createBookButton').click()
    cy.get('.imageUserBook')
  })

  it('Error al crear dos libros con el mismo titulo', function() {
    cy.get('#createBook').click()
    cy.get('#bookTitle').type('LibroPruebaCypress')
    cy.get('#bookResume').type('Resumen de prueba del libro')
    cy.get('#dragAndDropImg').attachFile('prueba.png')
    cy.get('#dragAndDropPdf').attachFile('prueba.pdf')
    cy.get('#createBookButton').click()
    cy.contains('Datos incorrectos')
  })

})


//prueba de interaccion con libros
describe('Interaccion con libros', () => {
  
  //nos logueamos antes de emepezar la bateria
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('prueba')
    cy.get('#password').type('holamundo')
    cy.get('#loginButton').click()
    cy.get('#books').click()
  })

  it('Entramos en un libro cualquiera que no sea nuestro', function() {
    //selecciona el primer elemento de todos los que tienen la clase searchLink
    cy.get('.searchLink:first').click()
    cy.contains('Comentarios')
    cy.contains('Eliminar').should('not.exist')
  })

  it('Entramos en un libro nuestro', function() {
    cy.get('#search').type('LibroPruebaCypress')
    cy.get('#searchBookButton').click()
    cy.get('.searchLink:first').click()
    cy.contains('Comentarios')
    cy.contains('Eliminar')
  })

  it('Dar like a un libro', function() {
    cy.get('#search').type('LibroPruebaCypress')
    cy.get('#searchBookButton').click()
    cy.get('.searchLink:first').click()
    cy.get('#like').click()
    cy.get('.active')
  })

  it('Quitar like a un libro', function() {
    cy.get('#search').type('LibroPruebaCypress')
    cy.get('#searchBookButton').click()
    cy.get('.searchLink:first').click()
    cy.get('#like').click()
    cy.get('.inactive')
  })

  it('Se muestra el formulario de comentario', function() {
    cy.get('#search').type('LibroPruebaCypress')
    cy.get('#searchBookButton').click()
    cy.get('.searchLink:first').click()
    cy.get('#comment').click()
    cy.contains('Comentario')
  })

  it('Se permite comentar en un libro', function() {
    cy.get('#search').type('LibroPruebaCypress')
    cy.get('#searchBookButton').click()
    cy.get('.searchLink:first').click()
    cy.get('#comment').click()
    cy.get('#commentText').type('Buen libro prueba')
    cy.get('#commentButton').click()
    cy.contains('Buen libro prueba')
  })

  it('Se permite eliminar mi libro', function() {
    cy.get('#search').type('LibroPruebaCypress')
    cy.get('#searchBookButton').click()
    cy.get('.searchLink:first').click()
    cy.get('#delBook').click()
    cy.contains('prueba')
  })
})


//prueba de usuaios
describe('Interaccion con usuarios', () => {
  
  //nos logueamos antes de emepezar la bateria
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('prueba')
    cy.get('#password').type('holamundo')
    cy.get('#loginButton').click()
    cy.get('#books').click()
    cy.visit('http://localhost:3000/user/gonzalo')
  })

  it('Vemos perfil de un usuario', function() {
    cy.contains('Followers')
  })

  it('Seguimos a un usuario', function() {
    cy.get('#followButton').click()
    cy.contains('Dejar de seguir')
  })

  it('Dejamos de seguir a un usuario', function() {
    cy.get('#followButton').click()
    cy.contains('Seguir')
  })


})