var express = require('express');
var api = express.Router();
const { Campeonato } = require('../models/campeonato')
const { Categoria } = require('../models/categoria')
const { Fecha } = require('../models/fecha')
const _ = require('lodash')
const { ApiResponse } = require('../models/api-response')
const { ObjectID } = require('mongodb')

api.get('/campeonatos', (req, res) => {
    Campeonato.find()
        .populate('fechas')
        .populate('categoria')
        .then((campeonatos) => {
            res.status(200).send(new ApiResponse({ campeonatos }))
        }), (e) => {
            res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
        }
})

api.post('/campeonato/:id/agregarfecha', async (req, res) => {

    let id = req.params.id
    try {
        let campeonato = await Campeonato.findById({ _id: id })
        let fecha = new Fecha(req.body)

        if (campeonato) {
            campeonato.fechas.push(fecha)
            await fecha.save()
            await campeonato.save()
            return res.status(200).send(new ApiResponse(campeonato));
        } else {
            res.status(404).send(new ApiResponse({}, "No hay datos para mostrar"));
        }
    } catch (e) {
        console.log(e)
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }
})

api.post('/campeonato', async (req, res) => {

    try {

        let nombre = req.body.nombre;
        let anio = req.body.anio;
        let fechas = req.body.fechas;
        let categoria = req.body.categoria;

        let campeonato = new Campeonato({ nombre, anio, fechas, categoria })
        campeonato = await campeonato.save();

        cat = await Categoria.findById(categoria)
        cat.campeonatos.push(campeonato)
        await cat.save();

        return res.status(200).send(new ApiResponse(campeonato));

    } catch (e) {
        console.log(e)
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }
})

api.put('/campeonato/:idfecha/modificarfecha', async (req, res) => {

    try {
        let id = req.params.idfecha
        let fecha = await Fecha.findById(id)
        if (fecha) {
            fecha = new Fecha(req.body) 
            fecha.save();
            return res.status(200).send(new ApiResponse(fecha));
        } else {
            res.status(404).send(new ApiResponse({}, "Ocurrió un error al modificar"));
        }
    } catch (e) {
        console.log(e)
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }
})

api.put('/campeonato/:id', async (req, res) => {

    try {
        let id = req.params.id
        let campeonato = await Campeonato.findOneAndUpdate({ id }, req.body)
        if (campeonato) {
            return res.status(200).send(new ApiResponse(campeonato));
        } else {
            res.status(404).send(new ApiResponse({}, "Ocurrió un error al modificar"));
        }
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
