var express = require('express');
var api= express.Router();
const {Usuario}=require('../models/usuario')
const _ = require('lodash')
const {ApiResponse} = require('../models/api-response')

api.get('/usuarios',(req, res)=>{

    Usuario.find().populate('categorias')
        .exec()
        .then((usuarios) => res.status(200).send(new ApiResponse({usuarios})))
        .catch((e)=>res.status(400).send(new ApiResponse({},`Mensaje: ${e}`)))
})

api.get('/usuarios/:ci',(req, res)=>{

    let ci = req.params.ci;

    Usuario.findOne({
        ci: ci
    })
    .populate()
    .then(usuario=>{
        if(usuario){
            res.status(200).send(new ApiResponse({usuario}))
        }else{
            res.status(404).send(new ApiResponse({},"No hay datos para mostrar"));
        }
    })
    .catch((e)=>res.status(400).send(new ApiResponse({},`Mensaje: ${e}`)))

})

api.post('/usuarios', async (req,res) =>{
    
    try{        
        var usuario = new Usuario(_.pick(req.body,['nombre','apellido','ci','email','password','roles','categorias','categoriacuota']))
        await usuario.save()
        const token = await usuario.generateAuthToken()
        usuario.enviarConfirmacionAlta();
        res.header('x-auth',token).status(200).send({usuario});
    }catch(e){
        res.status(400).send(new ApiResponse({},`Mensaje: ${e}`))
    }
})

api.put('/usuarios/:id', (req, res) => {
    let _id = req.params._id;
    var body = _pick(req.body, ['nombre', 'apellido', 'fechaNacimiento','fechaVtoCarneSalud','email','password','roles','categorias','tokens']);
    
    //var roles =req.body.roles;

    Usuario.findOneAndUpdate({
        _id
    }, {
            $set: body
        }, {
            new: true
        }).then((usuario) => {
            if (usuario) {
                res.status(200).send(new ApiResponse({usuario}));
            } else {
                res.status(404).send(new ApiResponse({},"Ocurrió un error al modificar"))
            }
        }).catch((e) => {
            res.status(400).send(new ApiResponse({},"400-Ocurrió un error al modificar"))
        })
})

api.get('/usuarios/confirmacion/:token',async (req, res)=>{
    let token = req.params.token;
    try{
        let usuario = await Usuario.findByToken(token)
        if(usuario){
            res.status(200).send(new ApiResponse({usuario}));
        }
        else{
            res.send(new ApiResponse({},'No existe usuario con ese token.'))
        }
    }catch(e){
        res.status(400).send(e)
    }
    
})

module.exports=api;