var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const {Rol}=require('../models/rol') 
const {Usuario}=require('../models/usuario')

var CategoriaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    valorCuota: {
        type: Number,
        required: true,
        trim: true
    },
    diaGeneracionCuota: {
        type: Number,
        required: true,
        trim: true
    },
    diaVtoCuota: {
        type: Number,
        required: true,
        trim: true
    },
    cantidadCuotasAnuales: {
        type: Number,
        required: true,
        trim: true
    },
    dts:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'
    }],
    delegados:[{
        type: mongoose.Schema.Types.ObjectId,  ref: 'Usuario'
    }],
    tesoreros:[{
        type: mongoose.Schema.Types.ObjectId,  ref: 'Usuario'
    }],
    jugadores:[{
        type: mongoose.Schema.Types.ObjectId,  ref: 'Usuario'
    }],
    cuenta:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Cuenta'
    }
})

CategoriaSchema.plugin(uniqueValidator);



var Categoria = mongoose.model('Categoria',CategoriaSchema)
module.exports = {Categoria}
