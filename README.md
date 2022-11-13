# Bookster, red social para escritores y editoriales
### Desarrollado con React.js, Redux, Node.js y MongoDB
<br>

*Nombre: Gonzalo*

*Apellidos: Rando Serna*

<br>

## Resumen
Aplicación Web para que los escritores y editoriales de libros puedan publicar sus obras e interactuar con las obras de otros usuarios.

Puedes ver, comentar, valorar, publicar y descargar libros. La aplicación cuenta con un sistema de gestión de usuarios y sesiones, buscador de libros, interacción con el usuario, etc.

Proyecto desarrollado con React.js y Node.js, usando tecnologías como el manejo de estados con Redux, validación de usuarios con JsonWebToken, pruebas con Cypress, Jest y Supertest y base de datos MongoDB.

<br>

## Índice
<ol type='1'>
  <a href='#funcionamiento'><li>Funcionamiento de la aplicación</li></a>
    <ol type='A'>
      <a href='#login'><li>Login de un usuario</li></a>
      <a href='#createUser'><li>Creación de un usuario</li></a>
      <a href='#home'><li>Home del sitio</li></a>
      <a href='#buscador'><li>Buscador de libros</li></a>
      <a href='#libros'><li>Libros</li></a>
      <a href='#usuarios'><li>Usuarios</li></a>
    </ol>
  <a href=''><li>Estructura de la aplicación</li></a>
    <ol type='A'>
      <a href=''><li>Frontend</li></a>
      <a href=''><li>Backend</li></a>
    </ol>
  <a href=''><li>Testing del backend y frontend</li></a> 
    <ol type='A'>
      <a href=''><li>Testeando el frontend</li></a>
      <a href=''><li>Testeando el backend</li></a>
    </ol>
  <a href=''><li>Estructura de la base de datos</li></a> 
</ol>
<br><br>

<h1 id='funcionamiento'>1.Funcionamiento de la aplicación</h1>
Veremos como funciona la aplicación, las distintas funcionalidades que tiene y la interfaz de usuario.

<h2 id='login'>a.Login de un usuario</h2>
Lo primero que nos encontramos en la aplicación es el siguiente formulario de login donde podrás iniciar sesión con tu usuario y contraseña.

![image](https://user-images.githubusercontent.com/103594582/201534688-504c430f-ad9a-4e14-80dc-01037b7d00ea.png)

Abajo del formulario tenemos una opción para crear un usuario en caso de que no tengamos uno, esta funcionalidad la veremos más a delante.

Al rellenar el formulario con datos correctos, iniciaremos sesión en la aplicación y esta se mantendrá abierta hasta que la cerremos manualmente ya que los datos de la sesión se guardan en la memoria del cliente.

![image](https://user-images.githubusercontent.com/103594582/201534940-a824d603-79fd-4375-8e25-bdb9ba64ee54.png)

![image](https://user-images.githubusercontent.com/103594582/201534972-7b1162e3-2de6-4266-b243-eefc4f83aba1.png)

Como vemos se ha iniciado sesión correctamente. Si iniciamos sesión con datos incorrectos el backend nos manda un error.

![image](https://user-images.githubusercontent.com/103594582/201535028-0e813314-52a6-4177-881c-ae33f4268716.png)
<br><br>

<h2 id='createUser'>b.Creación de un usuario</h2>
Al pulsar en la opción de abajo del formulario de inicio de sesión, nos aparecerá un formulario de creación de usuario, donde debemos rellenar los campos y subir una foto de perfil para poder crear un usuario.

![image](https://user-images.githubusercontent.com/103594582/201535394-bad6908d-0db8-437a-a24d-0dc43d0e3fb9.png)

![image](https://user-images.githubusercontent.com/103594582/201535377-1b09af31-b03b-448f-a652-641495bd07d8.png)

Rellenamos los datos con unos datos de prueba y creamos un nuevo usuario.

![image](https://user-images.githubusercontent.com/103594582/201535598-35578452-e444-41bf-a409-e9a98ec5621d.png)

![image](https://user-images.githubusercontent.com/103594582/201535558-86c3cfa1-b97e-411c-8a60-00253ebba90c.png)

Pulsamos el boton de Aceptar y ya tendriamos un nuevo usuario.

![image](https://user-images.githubusercontent.com/103594582/201535796-4ca95d78-efc9-4cea-8420-02530683e430.png)

Si intentamos crear un usuario con datos incorrectos como por ejemplo, un nombre de un usuario que ya existe, nos lanza el siguiente error.

![image](https://user-images.githubusercontent.com/103594582/201535734-365d5c6c-f3f6-476c-937b-c49efee9aaa8.png)

También aparece este si las contraseñas no son iguales.

![image](https://user-images.githubusercontent.com/103594582/201535921-2e207514-a20c-4c62-aefe-9d0a7e8f46a8.png)
<br><br>

<h2 id='home'>c.Home del sitio</h2>
Al iniciar sesión aparecemos en el home del sitio, donde podremos ver los últimos libros publicados y podremos acceder a ellos, como también podemos acceder al buscador de libros y al menú de mi usuario.

![image](https://user-images.githubusercontent.com/103594582/201536404-e326e810-64a6-490b-9d8a-da75d31d71eb.png)

Encontramos a la izquierda información del usuario con el que estamos logueados como la foto de perfil, el nombre, la descripción o el número de seguidores. A la derecha los últimos libros publicados.

![image](https://user-images.githubusercontent.com/103594582/201536416-fe019123-87c1-429e-8b2c-bd494f50f15a.png)

Al hacer click sobre un libro podremos acceder e interactuar con el.

![image](https://user-images.githubusercontent.com/103594582/201536481-ac0aa583-683f-4406-a57c-5db1b8f4b845.png)
![image](https://user-images.githubusercontent.com/103594582/201536494-1e96f644-9511-4756-ac4e-c116e7a4a381.png)

Veremos esto a fondo más a delante.
<br><br>

<h2 id='buscador'>d.Buscador de libros</h2>
En menú del buscador encontramos una lista con libros recomendados y la barra de búsqueda.

![image](https://user-images.githubusercontent.com/103594582/201536841-af24e4f7-ac2e-4e1d-bc9d-fec14cc63204.png)

Podemos buscar un libro concreto.

![image](https://user-images.githubusercontent.com/103594582/201536886-822723fd-b360-4bc2-a141-e94dc807df0a.png)

Libros que empiecen por algo en específico.

![image](https://user-images.githubusercontent.com/103594582/201536913-3bf3be86-7b92-4e60-9b24-1f94fadfa671.png)

O varios tomos de una misma historia.

![image](https://user-images.githubusercontent.com/103594582/201536936-07cc90c6-f975-4cbf-b665-bec2593b0d11.png)

Al pulsar en un libro podremos interactuar con el.

![image](https://user-images.githubusercontent.com/103594582/201537248-80ce5d78-7648-48aa-b40d-d7081c2ee0c6.png)


<br><br>

<h2 id='libros'>e.Libros</h2>
Ya sea desde el home, el buscador o el perfil de usuario, podemos acceder a distintos libros. Al acceder a ellos se nos muestra información como el escritor o editorial, una foto de la portada del libro y un apartado donde podemos interactuar con el dando like o comentando.

![image](https://user-images.githubusercontent.com/103594582/201537410-060242ee-27fb-4938-9eed-e8af18c816b1.png)
![image](https://user-images.githubusercontent.com/103594582/201537420-c7ecd215-e9ec-46ff-9d5f-7118f549459d.png)

Al pulsar sobre el escritor o editorial accedemos a su perfil donde podemos ver más información.
![image](https://user-images.githubusercontent.com/103594582/201537455-18ae8433-f296-4171-a2de-494a470deded.png)

Podemos pulsar el icono de like y dar o quitar like a un libro.

![image](https://user-images.githubusercontent.com/103594582/201537485-32835fe0-007d-44d4-9560-fe2c2af780ba.png)
![image](https://user-images.githubusercontent.com/103594582/201537489-2dbed41f-751b-4775-8587-defd8c283373.png)

Pulsando en el botón de descargar, podemos descargar un PDF con el libro.

![image](https://user-images.githubusercontent.com/103594582/201537655-bc04ecc1-0dff-4c71-a14a-ecfd9a98779d.png)

(El contenido del PDF es el siguiente y lo he reciclado para todos los libros)

![image](https://user-images.githubusercontent.com/103594582/201537727-05f82ac5-17a5-477f-a057-1534f3ded75d.png)

Al pulsar en el icono de comentario se nos abre un formulario donde podemos escribir nuestro comentario.

![image](https://user-images.githubusercontent.com/103594582/201537868-5f082420-ac37-4b66-beb0-61ba926458e7.png)

Pulsando en comentar se publica el comentario.

![image](https://user-images.githubusercontent.com/103594582/201537878-27d5b540-e112-4816-8244-e355d13b0bac.png)
<br><br>

<h2 id='usuarios'>f.Usuarios</h2>
Podemos acceder al perfil de los usuarios de la aplicación y al de tu propio usuario. Al acceder al perfil de un usuario se nos muestra lo siguiente:

![image](https://user-images.githubusercontent.com/103594582/201537998-51d63b0a-af51-4279-8994-5db6ef4e84b4.png)

La foto de perfil y su nombre, la descripción del usuario, el número de seguidores, un botón para seguir o dejar de seguir y los libros que ha escrito el usuario.
Al pulsar el botón de seguir, comenzamos a seguir al usuario en concreto.

![image](https://user-images.githubusercontent.com/103594582/201538100-3bb9d9d1-2a87-4f84-9226-502124636b60.png)

El botón se combierte en uno de dejar de seguir y si lo pulsamos dejamos de seguir al usuario.

![image](https://user-images.githubusercontent.com/103594582/201538136-98045217-709e-48fb-a3f8-4032ad3935d8.png)

Desde el perfil también podemos acceder a los libros del usuario.
Si entramos a la sección de "Yo" o al perfil de nuestro usuario, la interfaz es un poco distinta.

![image](https://user-images.githubusercontent.com/103594582/201538279-946a7ca8-fac7-4369-8c8f-6c3b997b5940.png)

Encontramos la misma interfaz solo que con los botones de cerrar sesión y el de crear un nuevo libro. Si pulsamos el botón de cerrar sesión, cerraremos sesión y volveremos al login, si pulsamos el botón de crear libro nos aparecerá un formulário para crear un libro nuevo.

![image](https://user-images.githubusercontent.com/103594582/201538327-b19d6fe8-2279-452b-addb-24fb46be88cf.png)

El formulario nos pide el título del libro, un resumen, el PDF con el libro y una imagen de portada. Rellenamos el formulario y añadimos un nuevo libro.

![image](https://user-images.githubusercontent.com/103594582/201538566-46563f40-92ac-45a9-9c80-ac2e27ff13be.png)

![image](https://user-images.githubusercontent.com/103594582/201538590-0e34e550-1e70-409f-ae36-22d211354646.png)

![image](https://user-images.githubusercontent.com/103594582/201538622-6c8cd3e1-c407-4877-acf5-8ecb92ee6dc8.png)

![image](https://user-images.githubusercontent.com/103594582/201538642-9741d8fa-2b80-4622-80a7-5f9a0972aec6.png)

![image](https://user-images.githubusercontent.com/103594582/201538646-a01446ae-cc31-41f0-a63e-3637f22bf301.png)

![image](https://user-images.githubusercontent.com/103594582/201538662-58a7ef31-9277-424f-a9b4-d3090096c29b.png)

Si un libro es de tu usuario tienes la opción de eliminarlo pulsando el botón de eliminar.

![image](https://user-images.githubusercontent.com/103594582/201538677-5b929b05-2ebc-4182-b8ab-3ced54d468bb.png)

<br><br>
<br><br>

<h1 id='estructura'>2.Estructura de la aplicación</h1>
A continuación veremos como está estructurada la aplicación tanto el backend como el frontend
<br>

<h2 id='estructuraFrontend'>a.Estructura del frontend</h2>
El código de la aplicación se encuentra dentro de la carpeta "src", al acceder a ella encontramos la siguiente estructura:

<pre>
  components => contiene los componentes de React para armar la aplicación
  hooks => contiene estados personalizados
  img => contiene imágenes 
  reducers => contiene los reducers para manejar los estados de redux
  services => contriene los archivos con las funciones para conectarse al backend
  styles => contiene los archivos CSS
  App.jsx => archivo que contiene el componente App de React
  index.js => archivo principal de la aplicación
</pre>
<br>

<h2 id='estructuraBackend'>a.Estructura del backend</h2>
El código de la aplicación tiene la siguiente estructura:

<pre>
  controllers => contiene los archivos para realizar consultas a la base de datos
  models => contiene los schemas de mongoose
  test => contiene los test del backend 
  utils => contiene los archivos útiles como el archivo con la información de la base de datos, el logger o el middleware
  app.js => archivo principal de la aplicación
  index.js => index del backend
</pre>



