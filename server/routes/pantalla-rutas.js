var express = require('express');
var api= express.Router();
const {Pantalla}=require('../models/pantalla')
const _ = require('lodash')

 api.get('/pantallas',(req, res)=>{
    Pantalla.find()
    .then((pantallas)=>{
        res.send({pantallas})
    }),(e)=>{
        res.status(400).send(e)
    }

})

api.post('/pantallas', async (req,res) =>{
    
    try{
        var pantalla = new Pantalla(_.pick(req.body,['nombre','codigo']))
        await pantalla.save()
        res.status(200).send({"mensaje":"Agregado ok"});
    }catch(e){
        res.status(400).send({"error": e.errors.codigo.message})
    }
})

api.get('/pantallas/:codigo',(req,res)=>{
    var codigo = req.params.codigo;
    
    Pantalla.findOne({
        codigo: codigo
    }).then((pantalla)=> {
        if(pantalla){
            res.send({pantalla})
        }else{
            res.status(404).send()
        }
    }).catch((e)=>{
        res.status(400).send()
    })    
})

 module.exports=api;