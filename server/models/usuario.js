var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
var {enviarCorreoAlta} = require('../Utilidades/utilidades')

var UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },
    ci:{
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Number
    },
    fechaVtoCarneSalud: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} No es un email válido.'
        }
    },
    password: {
        type: String,
        minlength: 8
    },
    activo: {
        type: Boolean,
        default: false
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    categorias:[
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'
        }
    ],
    cuenta:{
        type: mongoose.Schema.Types.ObjectId, ref:'Cuenta'
    },
    tokens: [{
        access: {
            type: String,
        },
        token: {
            type: String,
        }
    }]
})

UsuarioSchema.plugin(uniqueValidator);

UsuarioSchema.methods.generateAuthToken = function () {
    var usuario = this;
    var access = 'auth'
    var token = jwt.sign({ _id: usuario._id.toHexString(), access }, process.env.JWT_SECRET).toString()

    usuario.tokens = usuario.tokens.concat([{ access, token }])

    return usuario.save().then(() => {

        return token
    })
}

UsuarioSchema.methods.removeToken = function (token) {
    var usuario = this;

    return usuario.update({
        $pull: {
            tokens: {
                token
            }
        }
    })
}

UsuarioSchema.statics.findByToken = function (token) {

    var Usuario = this
    var decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)

    } catch (e) {
        return Promise.reject(e)
    }
    return Usuario.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}
UsuarioSchema.pre('save', function (next) {
    var usuario = this;
    if (usuario.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(usuario.password, salt, (err, hash) => {
                usuario.password = hash
                next()
            })
        })
    } else {
        next()
    }

})

UsuarioSchema.methods.enviarConfirmacionAlta = function (){
    var usuario = this;
    enviarCorreoAlta(usuario)
}

UsuarioSchema.statics.findByCredentials = function (email, password) {
    Usuario = this
    return Usuario.findOne({ email }).then((usuario) => {
        if (!usuario) {
            return Promise.reject()
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, usuario.password, (err, res) => {
                if (!res) {
                    return reject()
                }
                return resolve(usuario)
            })
        })

    }).catch((e) => {
        return Promise.reject(e)
    })
}




var Usuario = mongoose.model('Usuario', UsuarioSchema)
//var Categoria  = mongoose.model('Categoria', CategoriaSchema);
module.exports = { Usuario }
