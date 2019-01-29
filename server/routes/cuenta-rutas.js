var express = require('express');
var api = express.Router();
const { Cuenta } = require('../models/cuenta')
const { Usuario } = require('../models/usuario')
const { ConceptosCaja } = require('../models/conceptosCaja')
const { Categoria } = require('../models/categoria')
const _ = require('lodash')
const { ObjectID } = require('mongodb')
const { ApiResponse } = require('../models/api-response')
const { autenticacion } = require('../middlewares/autenticacion')
var { enviarNotificacion } = require('../Utilidades/utilidades')

api.get('/cuenta/:_id', async (req, res) => {
    let id = req.params._id;

    Cuenta.findOne({
        _id: id
    })
        .then((cuenta) => {
            if (cuenta) {
                res.status(200).send(new ApiResponse({ cuenta }))
            } else {
                res.status(404).send(new ApiResponse({}, "No hay datos para mostrar"));
            }
        }).catch((e) => {
            res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
        })
})

api.get('/movimientospendientes/:id', async (req, res) => {
    let id = req.params.id;
    movimientos = []

    Cuenta.findOne({
        _id: id
    })
        .then(async (cuenta) => {
            if (cuenta) {
                for (let mov of cuenta.movimientos) {
                    if (mov.confirmado == false) {
                        let usuario = await Usuario.findById(mov.usuario)
                        mov.usuario = usuario
                        movimientos.push(mov);
                        console.log(movimientos)
                    }
                }
                res.status(200).send(new ApiResponse({ movimientos }))
            } else {
                res.status(404).send(new ApiResponse({}, "No hay datos para mostrar"));
            }
        }).catch((e) => {
            res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
        })

})

api.get('/movimientos/:id', autenticacion, async (req, res) => {

    try {

        let cta = await Cuenta.findById(req.params.id).populate('movimientos');
        if (cta) {
            let movimientos = [...cta.movimientos]

            if (req.query.tipo) {
                movimientos=movimientos.filter((mov)=>{
                    return mov.tipo===req.query.tipo
                })
            }
            if (req.query.concepto) {
                movimientos=movimientos.filter((mov)=>{
            
                    idconcepto= ObjectID(req.query.concepto)
                    
                    return mov.concepto.toString()===idconcepto.toString()
                })
            }
            if (req.query.fechaInicio) {
                movimientos=movimientos.filter((mov)=>{
                    return mov.fecha>=req.query.fechaInicio
                })
            }
            if (req.query.fechaFin) {
                movimientos=movimientos.filter((mov)=>{
                    return mov.fecha<=req.query.fechaFin
                })
            }
            console.log(movimientos.length);
            
            for (let i=0; i<movimientos.length; i++){
               
                let concepto= await ConceptosCaja.findById(movimientos[i].concepto)
                movimientos[i].concepto=concepto.nombre
                let usuario= await Usuario.findById(movimientos[i].usuario)
                console.log(usuario.nombre);
                
                console.log(movimientos[i]);
                
            }
    
            res.status(200).send(new ApiResponse({ movimientos }))
        }

       
    } catch (e) {
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }

})


api.patch('/cuenta/movimientos/ingresomovimiento/:id', async (req, res) => {

    try {
        let idCuenta = req.params.id;
        let movimiento = req.body.movimiento;

        let cuenta = await Cuenta.findById(idCuenta).populate('movimientos').exec();

        let nuevoSaldo = cuenta.saldo + movimiento.monto;

        let movimientosActualizados = cuenta.movimientos;
        movimientosActualizados.push(movimiento);

        Cuenta.findOneAndUpdate({
            _id: idCuenta
        }, {
                $set: { saldo: nuevoSaldo, movimientos: movimientosActualizados }
            }, {
                new: true
            }).then((cuenta) => {
                if (cuenta) {
                    res.status(200).send(new ApiResponse({ cuenta }));
                } else {
                    res.status(404).send(new ApiResponse({}, "Ocurrió un error al agregar el movimiento"))
                }
            }).catch((e) => {
                res.status(400).send(new ApiResponse({}, "400-Ocurrió un error al agregar el movimiento"))
            })
    } catch (e) {
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }
})

api.patch('/cuenta/transferencia/:id', async (req, res) => {
    // en el body viene el movimiento, idCuenta (destino), IdCategoria
    try {
        let cuentaOrigen = await Cuenta.findById(req.params.id).populate('movimientos').exec()
        let cuentaDestino = await Cuenta.findById(req.body.idcuenta).populate('movimientos').exec();
        let movimiento = req.body.movimiento;
        let categoriaDestino = await Categoria.findById(req.body.idcategoria).populate('tesoreros').exec()

        let nuevoSaldoCtaOrigen = cuentaOrigen.saldo - movimiento.monto;
        let nuevoSaldoCtaDestino = cuentaDestino.saldo + movimiento.monto;

        let movsCtaOrigen = cuentaOrigen.movimientos;
        movsCtaOrigen.push(movimiento);

        let movsCtaDestino = cuentaDestino.movimientos;
        movsCtaDestino.push(movimiento);


        await Cuenta.findOneAndUpdate({
            _id: cuentaOrigen._id
        }, {
                $set: { saldo: nuevoSaldoCtaOrigen, movimientos: movsCtaOrigen }
            }, {
                new: true
            })
        await Cuenta.findOneAndUpdate({
            _id: cuentaDestino._id
        }, {
                $set: { saldo: nuevoSaldoCtaDestino, movimientos: movsCtaDestino }
            }, {
                new: true
            })

        for (let t of categoriaDestino.tesoreros) {
            tituloNot = `Transferencia entre categorías`,
                bodyNot = `Hola ${t.nombre}! Se registró una trasnferencia a la categoria ${categoriaDestino.nombre}. Ingresá a la App para visualizar el movimiento.`
            enviarNotificacion(t, tituloNot, bodyNot)
        }
        res.status(200).send(new ApiResponse({ cuentaOrigen }));
    } catch (e) {
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }
})


module.exports = api;
