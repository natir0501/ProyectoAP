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
        let tipo=req.body.tipo;
        let fecha=req.body.fecha;
        let monto=req.body.monto;
        let concepto= req.body.concepto;
        let comentario=req.body.comentario;
        let usuMovimiento=req.body.usuario;

        if(tipo==="1"){tipo="Ingreso"} 
        else if(tipo==="2"){tipo="Egreso";monto=-monto}
        else{res.status(404).send(new ApiResponse({},"Tipo de movimiento inválido"))}

        let mov = {fecha, monto, tipo, concepto, comentario,usuMovimiento}
        
        let cuenta= await Cuenta.findById(idCuenta).populate('movimientos').exec();
        let nuevoSaldo=cuenta.saldo + monto;

        let movimientosActualizados=cuenta.movimientos;
        movimientosActualizados.push(mov);

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


module.exports=api;
