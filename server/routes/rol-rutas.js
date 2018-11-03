var express = require('express');
var api= express.Router();
const {Rol}=require('../models/rol')
const _ = require('lodash')
const {ApiResponse} = require('../models/api-response')

 api.get('/roles',(req, res)=>{
    
    Rol.find()
    .then((roles)=>{
        res.status(200).send(new ApiResponse({roles},'Datos Ok'))
    }),(e)=>{
        res.status(400).send(new ApiResponse({},`Mensaje: ${e}`))
    }
})

api.post('/roles', async (req,res) =>{
    
    try{
        var rol = new Rol(_.pick(req.body,['nombre','codigo']))
        await rol.save()
        res.status(200).send(new ApiResponse({mensaje : 'Agregado ok'},''));
    }catch(e){
        res.status(400).send(new ApiResponse({},"Ya existe código"))
    }
})

api.get('/roles/:codigo',(req,res)=>{
    var codigo = req.params.codigo;
    
    Rol.findOne({
        codigo: codigo
    }).then((rol)=> {
        if(rol){
            res.status(200).send(new ApiResponse({rol},'Dato ok'))
        }else{
            res.status(404).send(new ApiResponse({},"No hay datos para mostrar"));
        }
    }).catch((e)=>{
        res.status(400).send(new ApiResponse({},`Mensaje: ${e}`))
    })    
})

 module.exports=api;