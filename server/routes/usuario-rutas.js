var express = require('express');
var api= express.Router();
const {Usuario}=require('../models/usuario')
const _ = require('lodash')
const {ApiResponse} = require('../models/api-response')

api.get('/usuarios',(req, res)=>{
    Usuario.find()
    .then((usuarios)=>{
        res.status(200).send(new ApiResponse({usuarios},'Datos Ok'))
    }),(e)=>{
        res.status(400).send(new ApiResponse({},`Mensaje: ${e}`))
    }
})

api.get('/usuarios/:token', async (req, res) =>{
    try{
        let token = req.params.token;
        usuario =  await Usuario.findByToken(token);
        if(usuario){
            res.header('x-auth',token).status(200).send(new ApiResponse({'_id': usuario._id}))
        } 
    }catch(e){
        res.status(400).send(e)
    }
    
})

api.post('/usuarios', async (req,res) =>{
    
    try{        
        var usuario = new Usuario(_.pick(req.body,['nombre','apellido','email','password','roles']))
        await usuario.save()
        const token = await usuario.generateAuthToken()
        usuario.enviarConfirmacionAlta();
        res.header('x-auth',token).status(200).send({"mensaje":"Usuario ok"});
    }catch(e){
        res.status(400).send(e)
    }
})

api.put('/usuarios/:id', async (req, res) => {
    console.log(req.headers)
    let token = req.header('x-auth')
    

    try{
        let usuarioRequest = await Usuario.findByToken(token)
        if(!usuarioRequest){
            res.status(401).send(new ApiResponse({},'No autorizado'))
        }
        console.log('Pasó validación de usuario')
        let _id = req.params.id;
        console.log('Id',_id)
        let usuario = await Usuario.findById(_id)
        if(!usuario){
            res.status(401).send(new ApiResponse({},'Usuario inválido'))
        }
        usuario.nombre = req.body.nombre
        usuario.apellido = req.body.apellido
        usuario.fechaNacmiento = Date.parse(req.body.fnac)
        if (req.body.fmedica.vigente){
            usuario.fechaVtoCarneSalud = Date.parse(req.body.fmedica.fvenc)
        }
        usuario.password = req.body.password
        usuario.activo = true;
        usuario = await usuario.save()
        console.log('exito!!')
        res.status(200).send(new ApiResponse(usuario))
    }
    catch(err){
        console.log(err)
        res.status(400).send(new ApiResponse({},err))
    }
    
   

})

api.get('/usuarios/confirmacion/:token',async (req, res)=>{
    let token = req.params.token;
    try{
        let usuario = await Usuario.findByToken(token)
        if(usuario){
            res.status(200).send(new ApiResponse({mensaje : `Formulario de alta de ${usuario.nombre}`,usuario},''));
        }
        else{
            res.send(new ApiResponse({},'No existe usuario con ese token.'))
        }
    }catch(e){
        res.status(400).send(e)
    }
    
})

module.exports=api;