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
        let campeonato = await Campeonato.findById({ _id: id }).populate('fechas');
        let f = new Fecha(_.pick(req.body, ['numeroFecha',
            'fechaEncuentro', 'rueda', 'partido']))

        let fecha = new Fecha()
        if (campeonato) {

            for (let fecha of campeonato.fechas) {

                if (fecha.numeroFecha === f.numeroFecha && fecha.rueda === f.rueda) {
                    return res.status(400).send(new ApiResponse({},
                        "No se agregó. Ya existe el número de fecha"));
                }
            }
            campeonato.fechas.push(f)
            let fecha = await f.save()
            await campeonato.save()

            return res.status(200).send(new ApiResponse(fecha));
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
        let categoria = req.body.categoria._id;

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
        let fecha = await Fecha.findOneAndUpdate({ _id: id }, req.body)
        if (fecha) {
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
        let campeonato = await Campeonato.findOneAndUpdate({ _id: id }, req.body)
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

api.get('/fecha/:_id', (req, res) => {
    let id = req.params._id;

    Fecha.findOne({
        _id: id
    })
        .then((fecha) => {
            if (fecha) {
                res.status(200).send(new ApiResponse({ fecha }))
            } else {
                res.status(404).send(new ApiResponse({}, "No hay datos para mostrar"));
            }
        }).catch((e) => {
            res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
        })
})

module.exports = api;
