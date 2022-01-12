
const express = require('express');
require('dotenv').config();

// crear el servidor express
const app = express();

//Directorio publico
app.use(express.static('public'));  // use es un middleware

//lectura y parseo del body
app.use( express.json() )// para procesar las peticiones que vengan en formato json las proceso con este middleware

//Rutas:
app.use('/api/auth', require('./routes/auth'));


// escuchar peticiones http
app.listen( process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
})