var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

var TipoEventoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    }
})

TipoEventoSchema.plugin(uniqueValidator);

var TipoEvento = mongoose.model('TipoEvento',TipoEventoSchema)
module.exports = {TipoEvento}
