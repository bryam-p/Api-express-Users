const express = require('express')
const UserController = require('../controlers/UserControllers') //Requerimos al controlador
const api = express.Router()

/* POST: Para insertar datos.
    GET: Obtener datos
    PUT: Modificar información
    DELETE: Eliminar informacion 
*/

api.get('/saludo', (request, response) => {
    console.log("Primera ruta con express")
})

api.post('/createUser', UserController.create)
api.put('/updateUser/:id', UserController.update)
api.post('/loginUser',UserController.login)
module.exports = api;