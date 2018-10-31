var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

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
    DiaGeneracionCuota: {
        type: Number,
        required: true,
        trim: true
    },
    DiaVtoCuota: {
        type: Number,
        required: true,
        trim: true
    },
    CantidadCuotasAnuales: {
        type: Number,
        required: true,
        trim: true
    },
    DTs:[{
        type: mongoose.Schema.Types.ObjectId,
    }],
    Delegados:[{
        type: mongoose.Schema.Types.ObjectId,
    }],
    Tesoreros:[{
        type: mongoose.Schema.Types.ObjectId,
    }],
    Jugadores:[{
        type: mongoose.Schema.Types.ObjectId,
    }]
})

CategoriaSchema.plugin(uniqueValidator);

var Categoria = mongoose.model('Categoria',CategoriaSchema)
module.exports = {Categoria}
