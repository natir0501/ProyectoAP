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
        .populate('tesoreros')
        .populate('caja')
        .then((categorias) => {
            res.status(200).send(new ApiResponse({ categorias }))
        }), (e) => {
            res.status(400).send(new ApiResponse({}, `Mensaje: ${e}`))
        }
})

api.put('/categorias/:id', autenticacion, async (req, res) => {
    try {
        let _id = req.params.id
        let categoria = await Categoria.findOneAndUpdate({ _id }, req.body)
        if (categoria) {
            res.send(new ApiResponse({ categoria }))
        }
        else {
            res.status(404).send(new ApiResponse({}, 'Categoría no encontrada'))
        }
    } catch (error) {
        res.status(400).send({}, error)
    }
})

api.post('/categorias', async (req, res) => {

    try {

        let tesoreros = []
        let delegados = []
        let jugadores = []
        let movimientos = []

        let dts = []
        let nombre = req.body.nombre;
        let valorCuota = req.body.valorCuota;
        let diaGeneracionCuota = req.body.diaGeneracionCuota;
        let diaVtoCuota = req.body.diaVtoCuota;

        let cantidadCuotasAnuales = parseInt(req.body.cantidadCuotasAnuales)
        //En el body de la categoría, recibo saldo inicial
        let saldo = req.body.saldoInicial;

        let cajaCategoria = new Cuenta({ movimientos, saldo });
        await cajaCategoria.save();
        let cuenta = cajaCategoria._id;

        let categoria = new Categoria({
            nombre, valorCuota, diaGeneracionCuota,
            diaVtoCuota, cantidadCuotasAnuales, dts, tesoreros, delegados, jugadores, cuenta
        })

        categoria = await categoria.save();

        let correoDelegados = req.body.correosDelegados
        let correoJugadores = req.body.correosJugadores
        let correosTesoreros = req.body.correosTesoreros
        let correoDts = req.body.correosDts

        roles = await Rol.find()


        tesoreros = await altaMasivaUsuarios(correosTesoreros, roles[2]._id, categoria._id);

        delegados = await altaMasivaUsuarios(correoDelegados, roles[0]._id, categoria._id)

        jugadores = await altaMasivaUsuarios(correoJugadores, roles[3]._id, categoria._id);


        dts = await altaMasivaUsuarios(correoDts, roles[1]._id, categoria._id);


        categoria.dts = dts
        categoria.jugadores = jugadores
        categoria.tesoreros = tesoreros
        categoria.delegados = delegados
        categoria = await categoria.save();

        delegadosInstitucionales = await Usuario.find({ 'delegadoInstitucional': true })
        rolDelegadoInst = await Rol.findOne({ 'codigo': 'DIN' })

        let cargue = false;
        for (let i = 0; i < delegadosInstitucionales.length; i++) {
            for(let j = 0; j < delegadosInstitucionales[i].perfiles.length; j++){
               
                if(delegadosInstitucionales[i].perfiles[j].categoria.toString() === categoria._id.toString()){
                    delegadosInstitucionales[i].perfiles[j].roles.push(rolDelegadoInst._id)
                    cargue = true
                   
                }
              
            }
            if(!cargue){
                delegadosInstitucionales[i].perfiles.push({categoria: categoria._id, roles: [rolDelegadoInst._id]})
            }
            delegadosInstitucionales[i].save()
           

        }
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



altaMasivaUsuarios = async (correos, rolId, catId) => {
    usuariosIds = []

    for (let email of correos) {

        usuario = await Usuario.findOne({ email })

        if (usuario) {
            let encontreCat = false
            for (let i = 0; i < usuario.perfiles.length && !encontreCat; i++) {
                if (usuario.perfiles[i].categoria.toString() === catId.toString()) {
                    usuario.perfiles[i].roles.push(rolId)
                    encontreCat = true;
                }
            }
            if (!encontreCat) {
                usuario.perfiles.push({ 'categoria': catId, 'roles': [rolId] })
            }
            await usuario.save()
            usuariosIds.push(usuario._id)

        } else {
            let perfiles = [{ 'categoria': catId, 'roles': [rolId] }]
            usu = await new Usuario({ email, perfiles })
            usu.categoriacuota = catId
            usu = await usu.save()
            usu.generateAuthToken()
            usu.enviarConfirmacionAlta()
            usuariosIds.push(usu._id)
        }
    }
    return usuariosIds
}

module.exports = api;
