var mongoose = require('mongoose')

var FechaSchema = mongoose.Schema({
    numeroFecha: {
        type: Number
    },
    fechaEncuentro: {
        type: Number,
        required: true
    },
    rueda:{
        type: Number,
        required: true
    },
    partido: {
        rival:{
            type: String,
            required:true
        },
        golesPropios:{
            type: Number,
            required:true
        },
        golesRival:{
            type: Number,
            required:true
        },
        local:{
            type: Boolean,
            required: true
        },
        lugar:{
            nombre:{
                type: String,
            },
            direccion:{
                type: String,
            },
            linkUbicacion:{
                type: String
            }
        } 
    }
})

var Fecha = mongoose.model('Fecha',FechaSchema)
module.exports = {Fecha}