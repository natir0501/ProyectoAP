var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

var CampeonatoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    año: {
        type: Number,
        required: true
    },
    fechas:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Fecha'
    }]
})

CampeonatoSchema.plugin(uniqueValidator);

var Campeonato = mongoose.model('Campeonato',CampeonatoSchema)
module.exports = {Campeonato}