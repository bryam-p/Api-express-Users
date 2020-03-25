const User = require('../models/User') //Exportamos el modelo
const crypto = require('crypto') // npm install crypto --save
/*
req: Lo que vienen por la url
res: respuiesta que nos retorna
*/
function create(req, res) {
    var user = new User() //nueva instacia del modelo
    var params = req.body


    user.firstName = params.firstName
    user.lastName = params.lastName
    user.email = params.email
    user.password = pass(params.password)

    user.save((error, userCreated) => {
        if (error) {
            res.status(500).send({
                statusCode: 500,
                message: 'Error en el servidor'
            })
        } else {
            if (!userCreated) {
                res.status(400).send({
                    statusCode: 400,
                    message: 'Error al crear el usuario'
                })
            } else {
                res.status(200).send({
                    statusCode: 200,
                    message: 'Se ha creato el usuario',
                    userData: userCreated
                })
            }
        }
    })
}

function update(req, res) {
    console.log("aca llego")
    var parameters = req.body;
    var id = req.params.id
    let password = parameters.password
    console.log(password)

    if (password !== undefined && password !== '') {
        parameters.password = pass(password)
    }

    User.findByIdAndUpdate(id, parameters, (error, userUpdated) => {
        if (error) {
            res.status(500).send({
                message: 'Error en el servidor',
                statusCode: 500
            })
        } else {
            if (!userUpdated) {
                res.status(400).send({
                    message: 'Error al actualizar el usuario',
                    statusCode: 400
                })
            } else {
                res.status(200).send({
                    message: 'Usuario actualizado',
                    statusCode: 200
                })
            }
        }
    })

}

function pass(password) {
    let algorithm = 'aes-256-cbc'
    let key = crypto.createCipher(algorithm, password) //Se crea una llave encriptadora
    let encriptedPass = key.update(password, 'utf8', 'hex') // Se modifica con los parametros que le pasemos
    encriptedPass += key.final('hex')
    return encriptedPass
}

function login(req,res){
    let params = req.body
    User.findOne({email:params.email},(error,userLogged)=>{
        if (error) {
            res.status(500).send({
                message: 'Error en el servidor',
                statusCode:500
            })
        }else{
            if (!userLogged) {
                res.status(400).send({
                    message: 'El usuario no existe',
                    statusCode:400
                })
            }else{
                let password = pass(params.password)
                if(password===userLogged.password){
                    res.status(200).send({
                        message: "Los datos son correctos",
                        statusCode:200
                    })
                }else{
                    res.status(401).send({
                        message: 'Los datos son incorrectos',
                        statusCode:401
                    })
                }
            }
        }
    })
}

module.exports = { // exportamos el modulo(la funcion create)
    create,
    update,
    login
}