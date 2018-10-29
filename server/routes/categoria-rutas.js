var express = require('express');
var api= express.Router();
const {Categoria}=require('../models/categoria')
const _ = require('lodash')

api.get('/categorias',(req, res)=>{
    Categoria.find()
    .then((categorias)=>{
        res.send({categorias})
    }),(e)=>{
        res.status(400).send(e)
    }
})

api.post('/categorias', async (req,res) =>{
    
    try{
        var dtsIDs=req.body.DTs
        var dts = []
        var delegadosIDs=req.body.Delegados
        var delegados= []
        var tesorerosIDs=req.body.Tesoreros
        var tesoreros= []
        

      
        
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports=api;
