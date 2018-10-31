var express = require('express');
var api= express.Router();
const {Categoria}=require('../models/categoria')
const _ = require('lodash')
const {validarId} = require('../Utilidades/utilidades')
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
        console.log('entro')
        let tesoreros=req.body.tesoreros;
        let delegados=req.body.delegados;
        let jugadores=req.body.jugadores;
        let dts=req.body.dts;
        let nombre=req.body.nombre;
        let valorCuota=req.body.valorCuota;
        let diaGeneracionCuota=req.body.diaGeneracionCuota;
        let diaVtoCuota=req.body.diaVtoCuota;
        let cantidadCuotasAnuales=req.body.cantidadCuotasAnuales;

        let arrayIds = []
        
        arrayIds.push(...tesoreros)
        console.log('hola')
        arrayIds.push(...delegados)
        arrayIds.push(...jugadores)
        arrayIds.push(...dts)
       
        console.log('Array',arrayIds)
        console.log('antes del if')
        if(validarId(arrayIds)){
            console.log('en el if')
            let categoria=new Categoria({nombre,valorCuota,diaGeneracionCuota,
                diaVtoCuota,cantidadCuotasAnuales,dts,tesoreros,delegados,jugadores})
            await categoria.save();
           
            await categoria.asignarRoles()
            return res.status(200).send(new ApiResponse(categoria,''));
        }
        res.status(400).send(new ApiResponse({},'Algunos de los usuarios no son válidos'))        
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports=api;
