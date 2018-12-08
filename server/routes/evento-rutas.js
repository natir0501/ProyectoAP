var express = require('express');
var api= express.Router();
const {Evento}=require('../models/evento')
const _ = require('lodash')
const {ApiResponse} = require('../models/api-response')
const {ObjectID} = require('mongodb')

api.get('/eventos',(req, res)=>{
    
    Evento.find()
    .then((eventos)=>{
        res.status(200).send(new ApiResponse({eventos},''))
    }),(e)=>{
        res.status(400).send(new ApiResponse({},"Error al obtener datos."))
        console.log(e);
        
    }
})

api.get('/eventos/:id', async (req,res)=>{
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)){
        res.status(404).send(new ApiResponse({},"No se pudo obtener el evento"))
    }

    Evento.findOne({
        _id: id
    }).then((evento)=> {
        if(evento){
            res.status(200).send(new ApiResponse({evento},''))
        }else{
            res.status(404).send(new ApiResponse({},"No hay datos para mostrar."))
        }
    }).catch((e)=>{
        res.status(400).send(new ApiResponse({},"Ocurrió un error"))
        console.log(e);
    })    
})

api.post('/eventos', async (req,res) =>{
    
    try{
        var evento = new Evento(_.pick(req.body, ['fecha','nombre','tipoEvento','tipoEvento','lugar',
        'rival','invitados','categorias']))
        await evento.save()
       
        res.status(200).send(new ApiResponse({evento}));
        console.log("agregado OK.");
        
    }catch(e){
        res.status(400).send(new ApiResponse({},"No se pudo agregar el evento."))
        console.log(e);
        
    }
})

api.put('/eventos/:id', async (req, res) => {
    try {
        let _id = req.params.id;
        let evento = await Evento.findOneAndUpdate({_id}, { $set: req.body })
        if (!evento) {
            res.status(401).send(new ApiResponse({}, 'No fue posible actualizar el evento'))
        }
        res.status(200).send(new ApiResponse(evento))
        console.log("Actualizado ok");
    }
    catch (e) {
        res.status(400).send(new ApiResponse({},"Ocurrió un error al intentar actualizar"))
        console.log(e);
    }
})

module.exports = api;