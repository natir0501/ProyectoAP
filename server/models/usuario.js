var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const validator = require('validator')
/* const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs') */


var UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido:{
        type: String,
        required: true,
        trim: true
    },
    fechaNacimiento: {
        type: Number
    },
    fechaVtoCarneSalud:{
        type:Number
    },
    email: {
        type: String,
        required: true,
        minlength:1,
        trim: true,
        unique:true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} No es un email válido.'
        }
    },
    password: {
        type: String,
        minlength:8
    },
    activo:{
        type: Boolean,
        default: false
    },
    tokens: [{
        access:{
            type:String,
        },
        token:{
            type: String,
        }
    }]
})

UsuarioSchema.plugin(uniqueValidator);

var Usuario = mongoose.model('Usuario',UsuarioSchema)
module.exports = {Usuario}
