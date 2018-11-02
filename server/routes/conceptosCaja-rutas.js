var express = require('express');
var api= express.Router();
const {ConceptosCaja}=require('../models/conceptosCaja')
const _ = require('lodash')
const {ApiResponse} = require('../models/api-response')

api.get('/conceptosCaja',(req, res)=>{
    
    ConceptosCaja.find()
    .then((conceptosCaja)=>{
        res.status(200).send(new ApiResponse({conceptosCaja},''))
    }),(e)=>{
        res.status(400).send(new ApiResponse({},"Error al obtener datos."))
    }
})

module.exports=api;
