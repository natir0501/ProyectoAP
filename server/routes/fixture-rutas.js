var express = require('express');
var api = express.Router();
const { Campeonato } = require('../models/campeonato')
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

module.exports = api;
