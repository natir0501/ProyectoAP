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
    }

})

PantallaSchema.plugin(uniqueValidator);

var Pantalla = mongoose.model('Pantalla',PantallaSchema)
module.exports = {Pantalla}
