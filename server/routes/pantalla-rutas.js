var express = require('express');
var api = express.Router();
const { Pantalla } = require('../models/pantalla')
const _ = require('lodash')
const {ApiResponse} = require('../models/api-response')


api.get('/pantallas', (req, res) => {
    Pantalla.find()
        .then((pantallas) => {
            res.status(200).send(new ApiResponse({pantallas},"Datos ok"));
        }), (e) => {
            res.status(400).send(new ApiResponse({},`Mensaje: ${e}`))
        }

})

api.post('/pantallas', async (req, res) => {

    try {
        var nombre = req.body.nombre
        var codigo = req.body.codigo
        var rolesAlta=req.body.rolesAlta
        var rolesModificacion=req.body.rolesModificacion
        var rolesBaja=req.body.rolesBaja
        var rolesConsulta=req.body.rolesConsulta
        var pantalla = new Pantalla({ nombre, codigo, rolesAlta,rolesModificacion,rolesBaja,rolesConsulta})
        await pantalla.save()
        //res.status(200).send({"mensaje":"agregado ok"})
        res.status(200).send(new ApiResponse({},"Agregado Ok"));
    } catch (e) {
        res.status(400).send(new ApiResponse({},`Mensaje: ${e}`))
    }
})

api.get('/pantallas/:codigo', (req, res) => {
    var codigo = req.params.codigo;

    Pantalla.findOne({
        codigo: codigo
    }).then((pantalla) => {
        if (pantalla) {
            //res.send({ pantalla })
            res.status(200).send(new ApiResponse({pantalla},"Datos ok"));
        } else {
            res.status(404).send(new ApiResponse({},"No hay datos para mostrar"));
        }
    }).catch((e) => {
        res.status(400).send(new ApiResponse({},`Mensaje: ${e}`))
    })
})

api.put('/pantallas/:codigo', (req, res) => {
    var codigo = req.params.codigo;
    var body = _.pick(req.body, ['nombre', 'codigo', 'rolesAlta','rolesBaja','rolesModificacion','rolesConsulta']);

    Pantalla.findOneAndUpdate({
        codigo: codigo
    }, {
            $set: body
        }, {
            new: true
        }).then((pantalla) => {
            if (pantalla) {
                res.status(200).send(new ApiResponse({},"Actualizado correctamente"));
                //res.send({ "mensaje": "Actualizado Ok" })
            } else {
                res.status(404).send(new ApiResponse({},"No hay datos para actualizar"));
            }
        }).catch((e) => {
            res.status(400).send(new ApiResponse({},`Mensaje: ${e}`))
        })
})


module.exports = api;