var express = require('express');
var api= express.Router();
const {Categoria}=require('../models/categoria')
const _ = require('lodash')
const {validarTipo} = require('../Utilidades/utilidades')
const {ApiResponse} = require('../models/api-response')

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
        const errorPerfil = "Algunos usuarios no cumplen con el perfil"   
        let usuariosInvalidos = await validarTipo(req.body.dts,'DTS')
        if(usuariosInvalidos.length > 0){
            return res.status(400).send(new ApiResponse({'rol':'DT','usuarios': usuariosInvalidos},errorPerfil))
        }
        usuariosInvalidos = await validarTipo(req.body.tesoreros,'TES')
        if(usuariosInvalidos.length > 0){
            return res.status(400).send(new ApiResponse({'rol':'Tesorero','usuarios': usuariosInvalidos},errorPerfil))
        }
        usuariosInvalidos = await validarTipo(req.body.delegado,'DEL')
        if(usuariosInvalidos.length > 0){
            return res.status(400).send(new ApiResponse({'rol':'Delegado','usuarios': usuariosInvalidos},errorPerfil))
        }
        usuariosInvalidos = await validarTipo(req.body.jugadores,'JUG')
        if(usuariosInvalidos.length > 0){
            return res.status(400).send(new ApiResponse({'rol':'Jugador','usuarios': usuariosInvalidos},errorPerfil))
        }

        console.log('iupi')
      
        
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports=api;
