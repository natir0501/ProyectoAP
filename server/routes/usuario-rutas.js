var express = require('express');
var api = express.Router();
const { Usuario } = require('../models/usuario')
const { Categoria } = require('../models/categoria')
const { Rol } = require('../models/rol')
const _ = require('lodash')
const { ApiResponse } = require('../models/api-response')

api.get('/usuarios', (req, res) => {

    Usuario.find().populate('categorias')
        .exec()
        .then((usuarios) => res.status(200).send(new ApiResponse({ usuarios })))
        .catch((e) => res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`)))
})



api.get('/usuarios/:token', async (req, res) => {
    try {
        let token = req.params.token;

        usuario = await Usuario.findByToken(token);
        if (usuario) {
            res.header('x-auth', token).status(200).send(new ApiResponse({ usuario }))
        } else {
            res.status(404).send(new ApiResponse({}, 'Usuario inválido'))
        }
    } catch (e) {
        res.status(400).send(e)
    }

})

api.post('/usuarios', async (req, res) => {


    try {

        var usuario = new Usuario(_.pick(req.body, ['email']))

        let perfiles = req.body.perfiles
        usuario = await usuario.save()
        let categoriaCuota = await Categoria.findOne({_id: req.body.categoriacuota})
        const token = await usuario.generateAuthToken()
        usuario.categoriacuota = categoriaCuota._id
        let rolIds = []
        let categoria

        for (let perfil of perfiles) {
            categoria = await Categoria.findOne({ '_id': perfil.categoria })
            rolIds = []
            for (let rolCod of perfil.roles) {
                rol = await Rol.findOne({ 'codigo': rolCod })

                if (rol.codigo === 'DEL') {
                    categoria.delegados.push(usuario._id)
                }
                if (rol.codigo === 'DTS') {
                    categoria.dts.push(usuario._id)
                }
                if (rol.codigo === 'TES') {
                    categoria.tesoreros.push(usuario._id)
                }
                if (rol.codigo === 'JUG') {
                    categoria.jugadores.push(usuario._id)
                }
                rolIds.push(rol._id)
            }
            perfil.roles = [...rolIds]
            categoria.save()
        }
        usuario.perfiles = [...perfiles]
        usuario.save()
        usuario.enviarConfirmacionAlta()
        res.header('x-auth', token).status(200).send({ usuario })
    } catch (e) {
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }
})

api.post('/usuarios/login', async (req, res) => {

    try {
        let usuario = await Usuario.findByCredentials(req.body.email, req.body.password)
        if (usuario) {
            res.status(200).send({ usuario });
        }
        res.status(404).send(new ApiResponse({}, 'Usuario y/o contraseña inválidos'));
    } catch (e) {
        res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
    }
})


api.put('/usuarios/:id', async (req, res) => {

    let token = req.header('x-auth')


    try {
        let usuarioRequest = await Usuario.findByToken(token)
        if (!usuarioRequest) {
            res.status(401).send(new ApiResponse({}, 'No autorizado'))
        }

        let _id = req.params.id;

        let usuario = await Usuario.findOneAndUpdate({ _id }, { $set: req.body })
        if (!usuario) {
            res.status(401).send(new ApiResponse({}, 'Usuario inválido'))
        }

        res.status(200).send(new ApiResponse(usuario))
    }
    catch (err) {

        res.status(400).send(new ApiResponse({}, err))
    }



})

api.get('/usuarios/confirmacion/:token', async (req, res) => {
    let token = req.params.token;
    try {
        let usuario = await Usuario.findByToken(token)
        if (usuario) {
            res.status(200).send(new ApiResponse({ usuario }));
        }
        else {
            res.send(new ApiResponse({}, 'No existe usuario con ese token.'))
        }
    } catch (e) {
        res.status(400).send(e)
    }

})

module.exports = api;