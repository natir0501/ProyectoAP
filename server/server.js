
require('./config/config')
var cors = require('cors')
const express = require('express')
const {ObjectID} = require('mongodb')
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

app.get('/',(req, res)=>{
    res.send({mensaje: "Hola mundo"})

})










const port = process.env.PORT

app.use(bodyParser.json())


app.listen(port,()=>{
    console.log(`Started up at port ${port}`)
})

module.exports={app}