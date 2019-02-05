var express = require('express');
var api = express.Router();
const { Cuenta } = require('../models/cuenta')
const { Usuario } = require('../models/usuario')
const { ConceptosCaja } = require('../models/conceptosCaja')
const { Categoria } = require('../models/categoria')
const _ = require('lodash')
const { ObjectID } = require('mongodb')
const { ApiResponse } = require('../models/api-response')
var { enviarNotificacion } = require('../Utilidades/utilidades')

var infoUsuario = 'nombre apellido email perfiles ci celular direccion fechaVtoCarneSalud delegadoInstitucional fechaNacimiento'
infoUsuario +=' fechaUltimoExamen requiereExamen emergencia sociedad contacto posiciones activo perfiles categoriacuota ultimoMesCobrado cuenta'


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

api.get('/movimientos/:id', async (req, res) => {

    try {

        let cta = await Cuenta.findById(req.params.id);
        if (cta) {
            let movs = [...cta.movimientos]

            if (req.query.tipo) {
                movs=movs.filter((mov)=>{
                    return mov.tipo===req.query.tipo
                })
            }
            if (req.query.concepto) {
                movs=movs.filter((mov)=>{
            
                    idconcepto= ObjectID(req.query.concepto)
                    
                    return mov.concepto.toString()===idconcepto.toString()
                })
            }
            if (req.query.fechaInicio) {
                movs=movs.filter((mov)=>{
                    return mov.fecha>=req.query.fechaInicio
                })
            }
            if (req.query.fechaFin) {
                movs=movs.filter((mov)=>{
                    return mov.fecha<=req.query.fechaFin
                })
            }
         
            let movimientos = []
            
            for (let i=0; i<movs.length; i++){
                let movimiento = movs[i]._doc
                let concepto= await ConceptosCaja.findById(movimiento.concepto)
             
                movimiento.concepto=concepto.nombre
                let usuario= await Usuario.findById(movimiento.usuario)
                movimiento.usuario = usuario.nombre + ' ' + usuario.apellido
                movimientos.push(movimiento)
                
                
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
        
        
        let nuevoSaldo = cuenta.saldo + parseInt(movimiento.monto);

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
        let categoriaDestino = await Categoria.findById(req.body.idcategoria).populate('tesoreros',infoUsuario).exec()

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
