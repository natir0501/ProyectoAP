var express = require('express');
var api = express.Router();
const { Pantalla } = require('../models/pantalla')
const _ = require('lodash')
const { ObjectID } = require('mongodb')
const { Rol } = require('../models/rol')

api.get('/pantallas', (req, res) => {
    Pantalla.find()
        .then((pantallas) => {
            res.send({ pantallas })
        }), (e) => {
            res.status(400).send(e)
        }

})

api.post('/pantallas', async (req, res) => {

    try {
        var arrayRolesIds = req.body.roles;
        var roles = []

        if (arrayRolesIds) {
            console.log('Antes')
            for (let id of arrayRolesIds) {
                console.log('Entro al for')
                if (!ObjectID.isValid(id)) {
                    console.log('No es un id')
                    return res.status(400).send({ error: "No es un id" })
                }
                let rol = await Rol.findById(id)
                console.log(typeof(rol))
                if (!rol) {
                    console.log('No es un rol')
                    return res.status(400).send({ error: "No es un rol" })
                }
                console.log('Agrego rol: ', rol)
                roles.push(rol)
            }
        }
        console.log(roles)
        var nombre = req.body.nombre
        var codigo = req.body.codigo
        var pantalla = new Pantalla({ nombre, codigo, roles })
        await pantalla.save()
        res.status(200).send({ "mensaje": "Agregado ok" });
    } catch (e) {
        res.status(400).send({ "error": e })
    }
})

api.get('/pantallas/:codigo', (req, res) => {
    var codigo = req.params.codigo;

    Pantalla.findOne({
        codigo: codigo
    }).then((pantalla) => {
        if (pantalla) {
            res.send({ pantalla })
        } else {
            res.status(404).send()
        }
    }).catch((e) => {
        res.status(400).send()
    })
})

api.put('/pantallas/:codigo', (req, res) => {
    var codigo = req.params.codigo;
    var body = _pick(req.body, ['nombre', 'codigo', 'roles']);

    Pantalla.findOneAndUpdate({
        codigo: codigo
    }, {
            $set: body
        }, {
            new: true
        }).then((pantalla) => {
            if (pantalla) {
                res.send({ "mensaje": "Actualizado Ok" })
            } else {
                res.status(404).send()
            }
        }).catch((e) => {
            res.status(400).send()
        })
})


module.exports = api;