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


api.patch('/cuenta/movimientos/ingresomovimiento/:id', async (req,res) =>{
    
    try{ 
        let idCuenta=req.params.id;
        let movimiento=req.body.movimiento;

        let cuenta= await Cuenta.findById(idCuenta).populate('movimientos').exec();
        let nuevoSaldo=cuenta.saldo + movimiento.monto;

        let movimientosActualizados=cuenta.movimientos;
        movimientosActualizados.push(movimiento);

        Cuenta.findOneAndUpdate({
            _id: idCuenta
        },{
            $set: {saldo: nuevoSaldo, movimientos: movimientosActualizados}
        }, {
            new: true
        }).then((cuenta)=>{
            if (cuenta) {
                res.status(200).send(new ApiResponse({cuenta}));
            } else {
                res.status(404).send(new ApiResponse({},"Ocurrió un error al agregar el movimiento"))
            }
        }).catch((e)=>{
            res.status(400).send(new ApiResponse({},"400-Ocurrió un error al agregar el movimiento"))
        })
    }catch(e){
        res.status(400).send(new ApiResponse({},`Mensaje: ${e}`))
    }
})

api.patch('/cuenta/nuevopago/:id', async (req,res) =>{
//cuenta del usuario
    try{ 


    }catch(e){
        res.status(400).send(new ApiResponse({},`Mensaje: ${e}`))
    }
})


module.exports=api;
