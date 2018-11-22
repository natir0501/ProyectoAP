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
        let conf = false;

        let categoria = await Categoria.findById(jugador.categoriacuota)
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
            usuario: req.usuario,
            referencia: null
        };

        jugador.cuenta.saldo = jugador.cuenta.saldo + mov.monto

        /*Si el que ingresa el movimiento y el usuario al que registro el pago son distintos
        asumo que el registro de pago lo hace el tesorero, entonces confirmado=true y cambio saldo 
        de la categoría
         */
        if (jugador !== req.usuario) {
            mov.conf = true;
            categoria.cuenta.saldo = categoria.cuenta.saldo + mov.monto
        }

        jugador.cuenta.movimientos.push(mov);
        jugador = await jugador.save()

        /*Si el movimiento no está confirmado, guardo la referencia al mov del jugador en el movimiento 
        que voy a guardar en la categoría.  
        */
        if (conf === false) {
            mov.referencia = jugador.cuenta.movimientos[jugador.cuenta.movimientos.length - 1]._id;
        }

        categoria.cuenta.movimientos.push(mov);
        await categoria.cuenta.save()

        res.status(200).send(new ApiResponse({mov}))
       

    } catch (e) {
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }
})

module.exports = api;