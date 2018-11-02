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
            for (let id of arrayRolesIds) {
                if (!ObjectID.isValid(id)) {
                    return res.status(400).send({ error: "No es un id" })
                }
                let rol = await Rol.findById(id)
                console.log(typeof(rol))
                if (!rol) {
                    return res.status(400).send({ error: "No es un rol" })
                }
                roles.push(rol)
            }
        }
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
    var body = _.pick(req.body, ['nombre', 'codigo', 'roles']);

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