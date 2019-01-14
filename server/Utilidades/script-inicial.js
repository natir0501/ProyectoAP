const { Rol } = require('../models/rol')
const { Pantalla } = require('../models/pantalla')
const { Usuario } = require('../models/usuario')

const scriptInicial = async () => {
    await cargaRoles()
    await cargaPantallas()
    await cargaDelegadosI()
}

const cargaRoles = async () => {
    const roles = await Rol.find()
    if (roles.length === 0) {
        await new Rol({ 'nombre': 'Delegado', 'codigo': 'DEL' }).save()
        await new Rol({ 'nombre': 'DT', 'codigo': 'DTS' }).save()
        await new Rol({ 'nombre': 'Tesorero', 'codigo': 'TES' }).save()
        await new Rol({ 'nombre': 'Jugador', 'codigo': 'JUG' }).save()
        await new Rol({ 'nombre': 'Delegado Institucional', 'codigo': 'DIN' }).save()
    }



}

const cargaPantallas = async () => {
    const pantallas = await Pantalla.find()
    const delegado = await Rol.findOne({ 'codigo': 'DEL' })
    const dt = await Rol.findOne({ 'codigo': 'DTS' })
    const tesorero = await Rol.findOne({ 'codigo': 'TES' })
    const jugador = await Rol.findOne({ 'codigo': 'JUG' })
    const delegadoInst = await Rol.findOne({ 'codigo': 'DIN' })
    
    if (pantallas.length === 0) {
        
        
        
        await new Pantalla({ 'nombre': 'Datos de jugador', 'menu': 'Jugador', 'opcionMenu': 'Datos de jugador', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, jugador._id, dt._id,] }).save()
        await new Pantalla({ 'nombre': 'Informe de Pago', 'menu': 'Jugador', 'opcionMenu': 'Informe de Pago', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, jugador._id,] }).save()
        await new Pantalla({ 'nombre': 'Saldos y Movs.', 'menu': 'Jugador', 'opcionMenu': 'Saldos y Movs.', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, jugador._id,] }).save()
        await new Pantalla({ 'nombre': 'Datos deportivos', 'menu': 'Jugador', 'opcionMenu': 'Datos deportivos', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, jugador._id,] }).save()
        await new Pantalla({ 'nombre': 'Cambiar Password', 'menu': 'Jugador', 'opcionMenu': 'Cambiar Passowrd', 'componente': 'ModificarPasswordPage', 'roles': [jugador._id,delegadoInst._id, delegado._id,] }).save()
        
        
        await new Pantalla({ 'nombre': 'Eventos', 'menu': 'Agenda', 'opcionMenu': 'Eventos', 'componente': 'ListaEventosPage', 'roles': [delegadoInst._id, jugador._id, delegado._id, dt._id,] }).save()
        await new Pantalla({ 'nombre': 'Mant Fixture', 'menu': 'Agenda', 'opcionMenu': 'Mant Fixture', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, delegado._id,] }).save()
        await new Pantalla({ 'nombre': 'Fixture', 'menu': 'Agenda', 'opcionMenu': 'Fixture', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, jugador._id, delegado._id, dt._id,] }).save()
        

        await new Pantalla({ 'nombre': 'Registro de Pago', 'menu': 'Tesorería', 'opcionMenu': 'Registro de Pago', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, tesorero._id,] }).save()
        await new Pantalla({ 'nombre': 'Conceptos de Caja', 'menu': 'Tesorería', 'opcionMenu': 'Conceptos de Caja', 'componente': 'ConceptosDeCajaPage', 'roles': [delegadoInst._id, tesorero._id,] }).save()
        await new Pantalla({ 'nombre': 'Aprobación de Pago', 'menu': 'Tesorería', 'opcionMenu': 'Aprobación de Pago', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, tesorero._id,] }).save()
        await new Pantalla({ 'nombre': 'Ingreso Movimiento', 'menu': 'Tesorería', 'opcionMenu': 'Ingreso Movimiento', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, tesorero._id,] }).save()
        await new Pantalla({ 'nombre': 'Cons. Movimientos', 'menu': 'Tesorería', 'opcionMenu': 'Cons. Movimientos', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, delegado._id, tesorero._id,] }).save()
        await new Pantalla({ 'nombre': 'Cons. Mov y Sdo por Jugador', 'menu': 'Tesorería', 'opcionMenu': 'Cons. Mov y Sdo por Jugador', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, jugador._id, tesorero._id,] }).save()
        
        
        await new Pantalla({ 'nombre': 'Registro de datos', 'menu': 'Dirección Técnica', 'opcionMenu': 'Registro de datos', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, dt._id,] }).save()
        await new Pantalla({ 'nombre': 'Consulta de datos', 'menu': 'Dirección Técnica', 'opcionMenu': 'Consulta de datos', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, jugador._id, dt._id,] }).save()
        await new Pantalla({ 'nombre': 'Cambiar Password', 'menu': 'Dirección Técnica', 'opcionMenu': 'Cambiar Passowrd', 'componente': 'ModificarPasswordPage', 'roles': [dt._id,] }).save()


        await new Pantalla({ 'nombre': 'Permisos', 'menu': 'Back Office', 'opcionMenu': 'Permisos', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, delegado._id,] }).save()
        await new Pantalla({ 'nombre': 'Creación de Usuario', 'menu': 'Back Office', 'opcionMenu': 'Creación de Usuario', 'componente': 'AltaDeUsuarioPage', 'roles': [delegadoInst._id, delegado._id,] }).save()
        await new Pantalla({ 'nombre': 'Categorías', 'menu': 'Back Office', 'opcionMenu': 'Categorías', 'componente': 'ListaCategoriasPage', 'roles': [delegadoInst._id,] }).save()
        await new Pantalla({ 'nombre': 'Tipo de Eventos', 'menu': 'Back Office', 'opcionMenu': 'Tipo de Eventos', 'componente': 'TipoEventosPage', 'roles': [delegadoInst._id, delegado._id,] }).save()
        await new Pantalla({ 'nombre': 'Mod perfiles y password', 'menu': 'Back Office', 'opcionMenu': 'Mod perfiles y password', 'componente': 'UsuariosEnCategoríaPage', 'roles': [delegadoInst._id, delegado._id,] }).save()
        await new Pantalla({ 'nombre': 'Campeonatos', 'menu': 'Back Office', 'opcionMenu': 'Campeonatos', 'componente': 'ListaCampeonatosPage', 'roles': [delegadoInst._id, delegado._id,] }).save()
     
     
        
        
        
    } 

}

const cargaDelegadosI = async () => {
    const usuarios = await Usuario.find()
    if(usuarios.length === 0){
        let correos = ['gab.arpe@gmail.com','nati.r0501@gmail.com' ]

        for(let i = 0 ; i<correos.length; i++){
            let usuario = new Usuario({'email': correos[i], 'delegadoInstitucional': true})
            await usuario.generateAuthToken()
            usuario = await usuario.save() 
            await usuario.enviarConfirmacionAlta()
        }

    }
    

 

}


module.exports = { scriptInicial }
