var express = require('express');
var api= express.Router();
const {Cuenta}=require('../models/cuenta')
const _ = require('lodash')
const {ApiResponse} = require('../models/api-response')


api.get('/cuenta/:_id',(req,res)=>{
    let id = req.params._id;
    
    Cuenta.findOne({
        _id: id
    })
    .then((cuenta)=> {
        if(cuenta){
            res.status(200).send(new ApiResponse({cuenta}))
        }else{
            res.status(404).send(new ApiResponse({},"No hay datos para mostrar"));
        }
    }).catch((e)=>{
        res.status(400).send(new ApiResponse({},`Mensaje: ${e}`))
    })    
})

module.exports=api;
