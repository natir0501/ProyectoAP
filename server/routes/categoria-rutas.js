var express = require('express');
var api = express.Router();
const { Categoria } = require('../models/categoria')
const { Cuenta } = require('../models/cuenta')
const { Rol } = require('../models/rol')
const { Usuario } = require('../models/usuario')
const _ = require('lodash')
const { validarId } = require('../Utilidades/utilidades')
const { ApiResponse } = require('../models/api-response')
const { autenticacion } = require('../middlewares/autenticacion')

api.get('/categorias', autenticacion, (req, res) => {
    Categoria.find()
        .populate('dts')
        .populate('delegados')
        .populate('jugadores')
        .populate('tesorero')
        .populate('caja')
        .then((categorias) => {
            res.status(200).send(new ApiResponse({ categorias }))
        }), (e) => {
            res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
        }
})

api.post('/categorias', async (req, res) => {

    try {

        let nombre = req.body.nombre;
        let valorCuota = req.body.valorCuota;
        let diaGeneracionCuota = req.body.diaGeneracionCuota;
        let diaVtoCuota = req.body.diaVtoCuota;
        
        let cantidadCuotasAnuales = parseInt(req.body.cantidadCuotasAnuales)

        //En el body de la categoría, recibo saldo inicial
        let saldo = req.body.saldoInicial;
        let movimientos = []

        let correoDelegados = req.body.correosDelegados
        let correoJugadores = req.body.correosJugadores
        let correosTesoreros = req.body.correosTesoreros
        let correoDts = req.body.correosDts

        roles = await Rol.find()


        let tesoreros = await altaMasivaUsuarios(correosTesoreros, roles[2]._id);
        let delegados = await altaMasivaUsuarios(correoDelegados, roles[0]._id)
        let jugadores = await altaMasivaUsuarios(correoJugadores, roles[3]._id);
        let dts = await altaMasivaUsuarios(correoDts, roles[1]._id);







        let cajaCategoria = new Cuenta({ movimientos, saldo });
        await cajaCategoria.save();
        let cuenta = cajaCategoria._id;

        let categoria = new Categoria({
            nombre, valorCuota, diaGeneracionCuota,
            diaVtoCuota, cantidadCuotasAnuales, dts, tesoreros, delegados, jugadores, cuenta
        })
        await categoria.save();

        
        return res.status(200).send(new ApiResponse(categoria, ''));


    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

api.get('/categorias/:_id', (req, res) => {
    let id = req.params._id;

    Categoria.findOne({
        _id: id
    })
        .populate('dts')
        .populate('delegados')
        .populate('tesoreros')
        .populate('jugadores')
        .populate('cuenta')
        .then((categoria) => {
            if (categoria) {
                res.status(200).send(new ApiResponse({ categoria }))
            } else {
                res.status(404).send(new ApiResponse({}, "No hay datos para mostrar"));
            }
        }).catch((e) => {
            res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
        })
})

altaMasivaUsuarios = async (correos, rolId) => {
    usuariosIds = []
    console.log(correos, rolId)
    for (let email of correos) {
        usuario = await Usuario.findOne({email})
        console.log('Usuario: ',usuario)

        if (!usuario) {
            usu = new Usuario({ email })
            usu.roles.push(rolId)
            console.log('no existe', usu)
            usu = await usu.save()
            await usu.generateAuthToken()
            usuario.enviarConfirmacionAlta();
            usuariosIds.push(usu._id)
        }
        else {
            console.log('existe', usuario)
            usuario.roles.push(rolId)
            await usuario.save()
            usuariosIds.push(usuario._id)
        }

    };
    return usuariosIds
}

module.exports = api;
