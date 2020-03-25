const mongoose = require('mongoose')
const appImport = require('./app') // traemos el modulo de app
const port = 3000

mongoose.connect('mongodb://localhost:27017/bictiaMusic',{
    useNewUrlParser:true, useUnifiedTopology:true
},(error, response)=>{
    if (error) {
        console.log("Error de conexión", error)
    }else{
        console.log("Conectado correctamente")
        appImport.listen(port,()=>{
            console.log("Escuchando en el puerto:" ,port)
        })
    }
})

