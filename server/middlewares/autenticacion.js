var {Usuario} = require('./../models/usuario')

var autenticacion = (req, res, next) => {
    var token = req.header('x-auth')

    Usuario.findByToken(token).then((usuario) => {
        if (!usuario) {
            return Promise.reject()
        }
        req.usuario = usuario
        req.token = token
        next()
    }).catch((e) => {
        res.status(401).send()
    })
}

module.exports = {
    autenticacion
}