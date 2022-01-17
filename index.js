
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// crear el servidor express
const app = express();

// gestion BBDD
dbConnection();

//cors
app.use( cors() ); // habilito los cors con configuracion basica, para mas infor visitar -> https://www.npmjs.com/package/cors

//Directorio publico
app.use(express.static('public'));  // use es un middleware

//lectura y parseo del body
app.use( express.json() )// para procesar las peticiones que vengan en formato json las proceso con este middleware

//Rutas:
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// escuchar peticiones http
app.listen( process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
})