const {Usuario} = require('../models/usuario')
const {Rol} = require('../models/rol')
const {ObjectID} = require('mongodb')
const nodemailer = require('nodemailer');

const validarTipo = async (arrayUsuarios, tipoUsuario) => {
    let usuariosInvalidos = []
    const idTipoUsuario = await Rol.find({codigo: tipoUsuario})
    let usuarios = await Usuario.find({_id:{$in: arrayUsuarios}}) 
    console.log('Usuairos: ',JSON.stringify(usuarios))  
    for (usuario of usuarios){
        if(!usuario.roles.includes(idTipoUsuario)){
            usuariosInvalidos.push(usuario._id)
        }
    }
    return usuariosInvalidos
     

}

const validarId = async (arrayId) => {
    for (id of arrayId){
        if(!ObjectID.isValid){
            return false
        }
    }
    return true
}

const enviarCorreoAlta = (usuario) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'appcei.2018@gmail.com',
          pass: 'Proyecto2018'
        }
      });
    
    let ambiente;
    if(process.env.AMBIENTE==='PROD'){
        ambiente = ''
    }
    else{
        ambiente = `[${process.env.AMBIENTE}] - `
    }
    let url = process.env.URLREGISTRO + `${usuario.tokens[0].token}`
    let html = `<h2>Hola! Bienvenido/a a la app del CEI.</h2>
                <p>Por favor ingresa al siguiente link para completar registro:</p>
                <a href="${url}">Link</a>`
    var mailOptions = {
    from: 'appcei.2018@gmail.com',
    to: usuario.email,
    subject: `${ambiente}Confirmación de registro y alta en CEIapp`,
    html
    };
    
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    }
    });
}

module.exports={validarTipo,validarId, enviarCorreoAlta};