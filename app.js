const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/useRoutes')

const app = express()

app.use(bodyParser.json()) // Analiza los datos que se pasan por un url

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // Habilitar que se puede consumir el API
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With,Content-Type, Accept, Access-Control-Allow-Request-Method') //Permitir todos los metadatos y cookies
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS') //Habilitar todos los metodos de http
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS') //Confirmacion de los metodos
    next()
})

app.use('/api', routes)

module.exports = app // exportamos el modulo de app para usarlo en otros archivos
