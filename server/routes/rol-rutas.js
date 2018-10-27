var express = require('express');
var api= express.Router();
const {Rol}=require('../models/rol')
const _ = require('lodash')

 api.get('/roles',(req, res)=>{
    Rol.find()
    .then((rol)=>{
        res.send({rol})
    }),(e)=>{
        res.status(400).send(e)
    }
})

api.post('/roles', async (req,res) =>{
    
    try{
        var rol = new Rol(_.pick(req.body,['nombre','codigo']))
        await rol.save()
        res.status(200).send({"mensaje":"Agregado ok"});
    }catch(e){
        res.status(400).send({"error": e.errors.codigo.message})
    }
})

api.get('/roles/:codigo',(req,res)=>{
    var codigo = req.params.codigo;
    
    Rol.findOne({
        codigo: codigo
    }).then((rol)=> {
        if(rol){
            res.send({rol})
        }else{
            res.status(404).send()
        }
    }).catch((e)=>{
        res.status(400).send()
    })    
})

 module.exports=api;