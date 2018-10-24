require('./config/config')
var cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const {mongoose} = require('./db/mongoose')



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

app.get('/api',(req, res)=>{
   res.send({'mensaje': 'hola Nati'})

})

let ruta = __dirname
ruta = ruta.substring(0,ruta.length-6) + 'www'

app.use(express.static(ruta))

app.listen(port,()=>{
    console.log(`Started up at port ${port}`)

})

module.exports={app}