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
        
        /*Si el que ingresa el movimiento y el usuario al que registro el pago son distintos
        asumo que el registro de pago lo hace el tesorero, entonces confirmado=true y cambio saldo 
        de la categoría
         */
        let cuentacategoria= await Cuenta.findById(categoria.cuenta._id).populate('movimientos')
        if (jugador._id.toString()!==req.usuario._id.toString()) {
            mov.confirmado = true;
            conf=true
            cuentacategoria.saldo = parseInt(cuentacategoria.saldo) + parseInt(mov.monto)
        }

        let cuentajugador = await Cuenta.findById(jugador.cuenta._id).populate('movimientos')
        cuentajugador.movimientos.push(mov);
        cuentajugador.saldo=parseInt(cuentajugador.saldo) + parseInt(mov.monto)
        await cuentajugador.save()

        /*Si el movimiento no está confirmado, guardo la referencia al mov del jugador en el movimiento 
        que voy a guardar en la categoría.  
        */
        if (conf === false) {
            console.log("Queda Pendiente");
            
            mov.referencia = jugador.cuenta.movimientos[jugador.cuenta.movimientos.length - 1]._id;
        }

        cuentacategoria.movimientos.push(mov);
        await cuentacategoria.save()

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
        await Cuenta.findOneAndUpdate({
            _id: categoria.cuenta._id
        }, {
                $set: { saldo: nuevoSaldoCat, movimientos: movsActualizadosCat }
            }, {
                new: true
            })
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