require('./config/config')
var cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const {mongoose} = require('./db/mongoose')
const pantallasRuta= require('./routes/pantalla-rutas');
const rolesRuta= require('./routes/rol-rutas');
const UsuariosRuta= require('./routes/usuario-rutas');
const CategoriaRuta= require('./routes/categoria-rutas');


const app = express()


app.use(cors({
    
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204,
        "exposedHeaders":['x-auth']

      
}))
const port = process.env.PORT

app.use(bodyParser.json())

app.use('/api', pantallasRuta);
app.use('/api', rolesRuta);
app.use('/api', UsuariosRuta);
app.use('/api', CategoriaRuta);

let ruta = __dirname
ruta = ruta.substring(0,ruta.length-6) + 'www'

app.use(express.static(ruta))

app.listen(port,()=>{
    console.log(`Started up at port ${port}`)

})

module.exports={app}