var express = require('express');
var api = express.Router();
const { Evento } = require('../models/evento')
const _ = require('lodash')
const { ApiResponse } = require('../models/api-response')
const { ObjectID } = require('mongodb')
var { enviarNotificacion } = require('../Utilidades/utilidades')
const { Usuario } = require('../models/usuario')

api.get('/eventos', async (req, res) => {

    try {

        let filtro = {}
        if (req.query.fechaInicio && req.query.fechaFin) {
            let fecha = { $lt: req.query.fechaFin, $gt: req.query.fechaInicio }
            filtro = { fecha }
        }
        if (req.query.tipoEvento) {

            filtro = {
                ...filtro,
                'tipoEvento': ObjectID(req.query.tipoEvento)
            }
        }
        let eventos = await Evento.find(filtro).populate('tipoEvento')
        
        if (req.query.userId) {
            eventos = eventos.filter(e => {
                if (e.registrosDT) {
                    let registro = e.registrosDT.find(r => { 
                        return r.jugadorId.toString() === req.query.userId})
                    if(registro){
                        e.registrosDT = [registro]

                    }
                    return !!registro
                }
            })
        }

        res.status(200).send(new ApiResponse({ eventos }))
    } catch (e) {
        res.status(400).send(new ApiResponse({}, `Error al obtener datos: ${e}`))
    }
})

api.get('/eventos/:id/registrosDT', async (req, res) => {
    let idJugador = req.query.idUsuario;

    let idEvento = req.params.id;

    let comentario = ''
    try {



        let evento = await Evento.findOne({ _id: idEvento })

        if (evento) {
            if (!evento.registrosDT) {
                evento.registrosDT = []
            }
            for (let registro of evento.registrosDT) {

                if (registro.jugadorId.toString() === idJugador) {
                    comentario = registro.comentario
                }
            }
            res.send(new ApiResponse(comentario, ''))

        } else {
            res.status(404).send(new ApiResponse({}, 'Evento no encontrado'))
        }
    } catch (e) {
        console.log(e)
        res.status(400).send(new ApiResponse({}, e))
    }

})


api.get('/eventos/:id', async (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send(new ApiResponse({}, "No se pudo obtener el evento"))
    }

    Evento.findOne({
        _id: id
    }).populate('invitados')
        .populate('noAsisten')
        .populate('confirmados')
        .populate('categoria')
        .populate('tipoEvento')
        .then((evento) => {
            if (evento) {
                res.status(200).send(new ApiResponse({ evento }, ''))
            } else {
                res.status(404).send(new ApiResponse({}, "No hay datos para mostrar."))
            }
        }).catch((e) => {
            res.status(400).send(new ApiResponse({}, "Ocurrió un error"))
            console.log(e);
        })
})

api.post('/eventos', async (req, res) => {

    try {
        var evento = new Evento(_.pick(req.body, ['fecha', 'nombre', 'tipoEvento', 'tipoEvento', 'lugar',
            'rival', 'invitados', 'categoria']))
        await evento.save()

        for (let id of evento.invitados) {
            let user = await Usuario.findOne({ _id: id })
            enviarNotificacion(user, evento)
        }
        res.status(200).send(new ApiResponse({ evento }));
        console.log("agregado OK.");

    } catch (e) {
        res.status(400).send(new ApiResponse({}, "No se pudo agregar el evento."))
        console.log(e);

    }
})
api.put('/eventos/:id/confirmar', async (req, res) => {
    try {

        let _id = req.params.id;
        let usuario = req.body.usuario
        let asiste = req.body.asiste
        let evento = await Evento.findOne({ _id })
        if (evento) {

            if (evento.invitados.indexOf(usuario._id) > -1) {

                evento.invitados.splice(evento.invitados.indexOf(usuario._id), 1)

                if (asiste) {
                    evento.confirmados.push(usuario._id)
                } else {
                    evento.noAsisten.push(usuario._id)
                }
            } else {
                if (asiste) {
                    if (evento.confirmados.indexOf(usuario._id) < 0) {
                        evento.confirmados.push(usuario._id)
                        evento.noAsisten.splice(evento.noAsisten.indexOf(usuario._id), 1)
                    }
                } else {
                    if (evento.noAsisten.indexOf(usuario._id) < 0) {
                        evento.noAsisten.push(usuario._id)
                        evento.confirmados.splice(evento.confirmados.indexOf(usuario._id), 1)
                    }
                }
            }
            evento = await evento.save()
            res.status(200).send(new ApiResponse({ evento }, ''))
        }
        res.status(404).send()
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

api.put('/eventos/:id/registrosDT', async (req, res) => {
    try {
        let idEvento = req.params.id;

        let evento = await Evento.findOne({ _id: idEvento })


        if (evento) {
            if (!evento.registrosDT) { evento.registrosDT = [] }
            let encontre = false
            for (let ref of evento.registrosDT) {
                if (ref.jugadorId.toString() === req.body.jugadorId) {
                    ref.comentario = req.body.comentario
                    encontre = true
                }
            }
            if (!encontre) {
                evento.registrosDT.push({ jugadorId: req.body.jugadorId, comentario: req.body.comentario })
            }
            evento = await evento.save()
            res.send(new ApiResponse({}, 'Registro ingresado correctamente'))
        } else {
            res.status(404).send(new ApiResponse({}, 'Evento no encontrado'))
        }
    } catch (e) {
        console.log(e)
        res.status(400).send(new ApiResponse({}, 'Error al procesar registro'))
    }
})

api.put('/eventos/:id', async (req, res) => {
    try {
        let _id = req.params.id;
        let evento = await Evento.findOneAndUpdate({ _id }, { $set: req.body })
        if (!evento) {
            res.status(401).send(new ApiResponse({}, 'No fue posible actualizar el evento'))
        }
        res.status(200).send(new ApiResponse(evento))
        console.log("Actualizado ok");
    }
    catch (e) {
        res.status(400).send(new ApiResponse({}, "Ocurrió un error al intentar actualizar"))
        console.log(e);
    }
})



api.delete('/eventos/:id', async (req, res) => {
    try {
        let _id = req.params.id;
        let evento = await Evento.findOneAndRemove({ _id })
        if (!evento) {
            res.status(401).send(new ApiResponse({}, 'No fue posible borrar el evento'))
        }
        res.status(200).send(new ApiResponse(evento))
        console.log("Borrado ok");
    }
    catch (e) {
        res.status(400).send(new ApiResponse({}, "Ocurrió un error al intentar borrar"))
        console.log(e);
    }
})

module.exports = api;