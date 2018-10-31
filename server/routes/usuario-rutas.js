var express = require('express');
var api= express.Router();
const {Usuario}=require('../models/usuario')
const _ = require('lodash')

api.get('/usuarios',(req, res)=>{
    Usuario.find()
    .then((usuarios)=>{
        res.send({usuarios})
    }),(e)=>{
        res.status(400).send(e)
    }
})

api.post('/usuarios', async (req,res) =>{
    
    try{        
        var usuario = new Usuario(_.pick(req.body,['nombre','apellido','email','password','roles']))
        await usuario.save()
        const token = await usuario.generateAuthToken()
        res.header('x-auth',token).status(200).send({"mensaje":"Usuario ok"});
    }catch(e){
        res.status(400).send(e)
    }
})

api.put('/usuarios/:id', (req, res) => {
    let _id = req.params._id;
    var body = _pick(req.body, ['nombre', 'apellido', 'fechaNacimiento','fechaVtoCarneSalud','email','password','roles','tokens']);
    
    //var roles =req.body.roles;

    Usuario.findOneAndUpdate({
        _id: id
    }, {
            $set: body
        }, {
            new: true
        }).then((usuario) => {
            if (usuario) {
                res.status(200).send(new ApiResponse({mensaje : 'Modificado correctamente'},''));
            } else {
                res.status(404).send(new ApiResponse({},"Ocurrió un error al modificar"))
            }
        }).catch((e) => {
            res.status(400).send(new ApiResponse({},"400-Ocurrió un error al modificar"))
        })
})


module.exports=api;