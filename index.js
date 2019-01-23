'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
const cors = require('cors')

mongoose.connect(config.db,(err,res)=>{
    if(err)
    {
        return console.log(`error al conectar a la base de datos error: ${err}`)
    }
    console.log('Conexion a db')

    app.listen(config.port, ()=>{
        console.log(`API REST Corriendo en http://localhost:${config.port}`)
    })
})

