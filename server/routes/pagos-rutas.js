var express = require('express');
var api = express.Router();
const { Categoria } = require('../models/categoria')
const { Usuario } = require('../models/usuario')
const { Cuenta } = require('../models/cuenta')
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

         console.log(req.usuario._id);
         console.log(jugador._id);
        if (jugador._id.toString()!==req.usuario._id.toString()) {
            mov.confirmado = true;
            conf=true
            categoria.cuenta.saldo = categoria.cuenta.saldo + mov.monto
        }

        console.log(mov);
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

        res.status(200).send(new ApiResponse({ mov }))


    } catch (e) {
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }
})


api.patch('/pagos/confirmacion/:id', autenticacion, async (req, res) => {

    /*
    En la URL viene el id de la cuenta de la categoria.
    En el Body: viene pago{
        jugadorid:id del jugador 
        id:idmovimientoCat
        monto:monto
        referencia: idmovimientoCtaJugador
    }
    */

    try {


        let categoria = await Categoria.findById(req.params.id)
            .populate('cuenta')
            .populate('movimientos')
            .exec();

        let jugador = await Usuario.findById(req.body.jugadorid)
            .populate('cuenta')
            .populate('movimientos')
            .exec();

        let nuevoSaldoCat = categoria.cuenta.saldo + req.body.monto
        let movsActualizadosCat = categoria.cuenta.movimientos

        console.log("antes");

        for (movim of movsActualizadosCat) {
            if (movim.referencia !== null) {
                if (movim.referencia.toString() === req.body.referencia) {
                    if (movim.monto === req.body.monto) {
                        movim.confirmado = true;
                        movim.referencia = null;
                        movim.comentario = "Pago Confirmado"
                    }else{
                        res.status(404).send(new ApiResponse({},
                            "El monto del movimiento a confirmar en la cuenta de la categoria no coincide con el monto del movimiento pendiente."))
                    }

                }
            }
        }

        let movsActualizadosJug = jugador.cuenta.movimientos
        for (mov of movsActualizadosJug) {
            if (mov._id.toString() === req.body.referencia) {
                if(mov.monto === req.body.monto){
                    mov.confirmado = true
                    mov.comentario = "Pago Confirmado"
                }else{
                    res.status(404).send(new ApiResponse({},
                    "El monto del movimiento a confirmar en la cuenta del jugador no coincide con el monto del movimiento pendiente."))
                }

            }
        }

        //Cuenta Categoria
        await Cuenta.findOneAndUpdate({
            _id: categoria.cuenta._id
        }, {
                $set: { saldo: nuevoSaldoCat, movimientos: movsActualizadosCat }
            }, {
                new: true
            })

        //Cuenta jugador 
        await Cuenta.findOneAndUpdate({
            _id: jugador.cuenta._id
        }, {
                $set: { movimientos: movsActualizadosJug }
            }, {
                new: true
            })
        res.status(200).send(new ApiResponse({}, 'Pago confirmado correctamente.'))

    } catch (e) {
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }
})

module.exports = api;