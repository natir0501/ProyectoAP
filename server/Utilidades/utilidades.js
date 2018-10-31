const {Usuario} = require('../models/usuario')
const {Rol} = require('../models/rol')

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



module.exports={validarTipo};