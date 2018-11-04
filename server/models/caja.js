var mongoose = require('mongoose')

var CajaSchema = mongoose.Schema({
    movimientos: [{
        type: mongoose.Schema.Types.ObjectId
    }
    ],
    saldo: {
        type: Number,
        required: true,
        trim: true,
    }
})

var Caja = mongoose.model('Caja',CajaSchema)
module.exports = {Caja}