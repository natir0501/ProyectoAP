var mongoose = require('mongoose')

var EventoSchema = mongoose.Schema({
    fecha: {
        type:Number,
        required: true
    },
    nombre: {
        type:String,
        required:true,
        maxlengt: 20
    },
    tipoEvento: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'tipoEvento',
        required:true
    },
    lugar : {
        nombre:{
            type: String
        },
        direccion:{
            type: String
        },
        linkUbicacion:{
            type: String
        }
    },
    rival :{
        type: String
    },
    invitados:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'usuario'
    }],
    confirmados:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'usuario'
    }],
    noAsisten: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'usuario'
    }],
    categorias:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'usuario'
    }]
})

var Evento = mongoose.model('Evento',EventoSchema)
module.exports = {Evento}