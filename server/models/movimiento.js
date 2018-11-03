var mongoose = require('mongoose')
const tiposmovimientos= ["Ingreso", "Egreso"];

var MovimientoSchema = mongoose.Schema({
    fecha: {
        type: String,
        required: true,
        trim: true
    },
    monto: {
        type: Number,
        required: true,
        trim: true,
    },
    tipo: {
        type: String,
        enum: tiposmovimientos,
        require: true
    },
    concepto:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    comentario:{
        type: String,
        trim: true
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }

})

var Movimiento = mongoose.model('Movimiento',MovimientoSchema)
module.exports = {Movimiento}
