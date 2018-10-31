var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

var PantallaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    codigo: {
        type: String,
        required: true,
        minlength:5,
        trim: true,
        unique: true
    },
    rolesAlta:[{
        type: mongoose.Schema.Types.ObjectId,
    }],
    rolesBaja:[{
        type: mongoose.Schema.Types.ObjectId,
    }],
    rolesModificacion:[{
        type: mongoose.Schema.Types.ObjectId,
    }],
    rolesConsulta:[{
        type: mongoose.Schema.Types.ObjectId,
    }]    

})

PantallaSchema.plugin(uniqueValidator);

var Pantalla = mongoose.model('Pantalla',PantallaSchema)
module.exports = {Pantalla}
