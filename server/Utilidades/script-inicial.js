const { Rol } = require('../models/rol')

const cargaRoles = async () => {
const roles = await Rol.find()
if(roles.length===0){
    await new Rol({ 'nombre': 'Delegado', 'codigo': 'DEL' }).save()
    await new Rol({ 'nombre': 'DT', 'codigo': 'DTS' }).save()
    await new Rol({ 'nombre': 'Tesorero', 'codigo': 'TES' }).save()
    await new Rol({ 'nombre': 'Jugador', 'codigo': 'JUG' }).save()
}

}

module.exports={cargaRoles}