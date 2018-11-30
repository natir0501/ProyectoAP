var express = require('express');
var api= express.Router();
const {Categoria}=require('../models/categoria')
const {Cuenta}=require('../models/cuenta')
const _ = require('lodash')
const {validarId} = require('../Utilidades/utilidades')
const {ApiResponse} = require('../models/api-response')
const {autenticacion} = require('../middlewares/autenticacion')

api.get('/categorias',autenticacion,(req, res)=>{
    Categoria.find()
    .populate('dts')
    .populate('delegados')
    .populate('jugadores')
    .populate('tesorero')
    .populate('caja')
    .then((categorias)=>{
        res.status(200).send(new ApiResponse({categorias}))
    }),(e)=>{
        res.status(400).send(new ApiResponse({},`Mensaje: ${e}`))
    }
})

api.post('/categorias', async (req,res) =>{
    
    try{
        let tesoreros=req.body.tesoreros;
        let delegados=req.body.delegados;
        let jugadores=req.body.jugadores;
        let dts=req.body.dts;
        let nombre=req.body.nombre;
        let valorCuota=req.body.valorCuota;
        let diaGeneracionCuota=req.body.diaGeneracionCuota;
        let diaVtoCuota=req.body.diaVtoCuota;
        console.log(req.body.cantidadCoutasAnuales)
        let cantidadCuotasAnuales= parseInt(req.body.cantidadCuotasAnuales)

        //En el body de la categoría, recibo saldo inicial
        let saldo=req.body.saldoInicial;
        let movimientos=[]

        let correoDelegados = req.body.correosDelegados
        let correoJugadores = req.body.correosJugadores
        let correosTesoreros = req.body.correosTesoreros
        let correoDts = req.body.correosDts

        let arrayIds = []
        
        



        arrayIds.push(...tesoreros)
        arrayIds.push(...delegados)
        arrayIds.push(...jugadores)
        arrayIds.push(...dts)
       
        if(validarId(arrayIds)){

            let cajaCategoria = new Cuenta({movimientos,saldo});
            await cajaCategoria.save();
            let cuenta= cajaCategoria._id;
            
            let categoria=new Categoria({nombre,valorCuota,diaGeneracionCuota,
                diaVtoCuota,cantidadCuotasAnuales,dts,tesoreros,delegados,jugadores,cuenta})
            await categoria.save();
           
            await categoria.asignarRoles()

            return res.status(200).send(new ApiResponse(categoria,''));
        }
        res.status(400).send(new ApiResponse({},'Algunos de los usuarios no son válidos'))        
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

api.get('/categorias/:_id',(req,res)=>{
    let id = req.params._id;
    
    Categoria.findOne({
        _id: id
    })
    .populate('dts')
    .populate('delegados')
    .populate('tesoreros')
    .populate('jugadores')
    .populate('cuenta')
    .then((categoria)=> {
        if(categoria){
            res.status(200).send(new ApiResponse({categoria}))
        }else{
            res.status(404).send(new ApiResponse({},"No hay datos para mostrar"));
        }
    }).catch((e)=>{
        res.status(400).send(new ApiResponse({},`Mensaje: ${e}`))
    })    
})


module.exports=api;
