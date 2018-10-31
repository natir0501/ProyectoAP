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

        let nombre=req.body.nombre;
        let valorCuota=req.body.valorCuota;
        let diaGeneracionCuota=req.body.diaGeneracionCuota;
        let diaVtoCuota=req.body.diaVtoCuota;
        let cantCuotasAnuales=req.body.cantCuotasAnuales;
        let dts=req.body.dts;
        let tesoreros=req.body.tesoreros;
        let delegados=req.body.delegados;
        let jugadores=req.body.jugadores;
      
        let categoria=new Categoria({nombre,valorCuota,diaGeneracionCuota,diaVtoCuota,cantCuotasAnuales,dts,tesoreros,delegados,jugadores})
        await categoria.save();
        res.status(200).send(new ApiResponse({mensaje : 'Categoria ok'},''));
        
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports=api;
