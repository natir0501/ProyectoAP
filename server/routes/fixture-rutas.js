var express = require('express');
var api = express.Router();
const { Campeonato } = require('../models/campeonato')
const { Fecha } = require('../models/fecha')
const _ = require('lodash')
const { ApiResponse } = require('../models/api-response')
const { ObjectID } = require('mongodb')

api.get('/campeonatos', (req, res) => {
    Campeonato.find()
        .populate('fechas')
        .then((campeonatos) => {
            res.status(200).send(new ApiResponse({ campeonatos }))
        }), (e) => {
            res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
        }
})

api.post('/campeonato', async (req, res) => {

    try {
        
        let nombre = req.body.nombre;
        let anio = req.body.anio;
        let fechas = req.body.fechas;

        let campeonato = new Campeonato({nombre, anio, fechas})

        campeonato = await campeonato.save();
        return res.status(200).send(new ApiResponse(campeonato));

    } catch (e) {
        console.log(e)
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }
})

api.get('/campeonato/:_id', (req, res) => {
    let id = req.params._id;

    Campeonato.findOne({
        _id: id
    })
        .populate('fechas')
        .then((campeonato) => {
            if (campeonato) {
                res.status(200).send(new ApiResponse({ campeonato }))
            } else {
                res.status(404).send(new ApiResponse({}, "No hay datos para mostrar"));
            }
        }).catch((e) => {
            res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
        })
})

module.exports = api;
