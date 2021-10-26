const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// crear el servidor de express
const app = express();

// Base de datos
dbConnection();

//Directorio Publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth'));
//TODO: CRUD: Eventos


//Escuchar  peticiones
app.listen( process.env.PORT, () =>{
    console.log(`servidor corriendo en puerto ${ process.env.PORT }`);
});

