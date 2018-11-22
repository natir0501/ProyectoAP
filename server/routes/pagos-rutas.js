var express = require('express');
var api = express.Router();
const { Categoria } = require('../models/categoria')
const { Usuario } = require('../models/usuario')
const { autenticacion } = require('../middlewares/autenticacion')
const _ = require('lodash')
const { ApiResponse } = require('../models/api-response')


api.post('/pagos', autenticacion, async (req, res) => {
    try {


        let jugador = await Usuario.findById(req.body.jugadorid)
        .populate('cuenta')
        .populate('movimientos')
        .exec();
    let conf=false;

    let categoria= await Categoria.findById(jugador.categoriacuota)
        .populate('cuenta')
        .populate('movimientos')
        .exec();

        
    let mov = {
        fecha: new Date(),
        monto: req.body.monto,
        tipo: "Ingreso",
        concepto: req.body.concepto,
        comentario: req.body.comentario,
        confirmado: conf,
        usuario: req.usuario
    };
    
    jugador.cuenta.saldo=jugador.cuenta.saldo + mov.monto
    jugador.cuenta.movimientos.push(mov);
    await jugador.save()
    
    categoria.cuenta.saldo=categoria.cuenta.saldo + mov.monto
    categoria.cuenta.movimientos.push(mov);
    await categoria.cuenta.save()

    res.status(200).send(new ApiResponse({mov}))

    } catch (e) {
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }
})

module.exports = api;