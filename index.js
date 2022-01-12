
const express = require('express');
require('dotenv').config();

// crear el servidor express
const app = express();

//Directorio publico
app.use(express.static('public'));  // use es un middleware

//Rutas
/* app.get('/', (req, res) => {
    res.json({
        ok: true
    })
}) */


// escuchar peticiones http
app.listen( process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
})