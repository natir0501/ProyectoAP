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


api.put('/cuenta/movimientos/ingresomovimiento', async (req,res) =>{
    
    try{ 
        let idCuenta=req.body._id;
        let tipoMov=req.body.tipoMovimiento;
        let fecha=req.body.fecha;
        let monto=req.body.monto;
        let concepto= req.body.concepto;
        let comentario=req.body.comentario;
        let usuMovimiento=req.body.usuario;

        if(tipoMov==="1"){tipoMov='Ingreso'} 
        else if(tipoMov==="2"){tipoMov='Egreso';monto=-monto}
        else{res.status(404).send(new ApiResponse({},"Tipo de movimiento inválido"))}

        let movimiento = {fecha, monto, tipoMov, concepto, comentario,usuMovimiento}
        let cuenta= await Cuenta.findById(idCuenta).populate('movimientos').exec();
        console.log(cuenta);
        
        //push del movimiento. 
        //impactar saldo categoria.
        console.log(movimiento);
        

        Cuenta.findOneAndUpdate({
            _id: idCuenta
        },{
            $set: cuenta
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


module.exports=api;
