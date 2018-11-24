require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const {mongoose} = require('./db/mongoose')
const pantallasRuta= require('./routes/pantalla-rutas');
const rolesRuta= require('./routes/rol-rutas');
const UsuariosRuta= require('./routes/usuario-rutas');
const CategoriaRuta= require('./routes/categoria-rutas');
const ConceptosCaja= require('./routes/conceptosCaja-rutas');
const {cargaRoles}=require('./Utilidades/script-inicial');
const tipoEvento= require('./routes/tipoEvento-rutas');
const cors = require('cors')
const cuentaRuta= require('./routes/cuenta-rutas');



const app = express()
app.use(cors())

const port = process.env.PORT

app.use(bodyParser.json())

app.use('/api', pantallasRuta);
app.use('/api', rolesRuta);
app.use('/api', UsuariosRuta);
app.use('/api', CategoriaRuta);
app.use('/api', ConceptosCaja)
app.use('/api', tipoEvento);
app.use('/api', cuentaRuta);

let ruta = __dirname
ruta = ruta.substring(0,ruta.length-6) + 'www'

app.use(express.static(ruta))

app.listen(port,()=>{
    console.log(`Started up at port ${port}`)

})

cargaRoles();

module.exports={app}