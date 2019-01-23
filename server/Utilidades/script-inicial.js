const { Rol } = require('../models/rol')
const { Pantalla } = require('../models/pantalla')
const { Usuario } = require('../models/usuario')
const { Categoria } = require('../models/categoria')
const { ConceptosCaja } = require('../models/conceptosCaja')
const { Cuenta } = require('../models/cuenta')
const { Movimiento } = require('../models/movimiento')
const {TipoEvento}=require('../models/tipoEvento')
var cron = require('node-cron');

const scriptInicial = async () => {
    await cargaRoles()
    await cargaPantallas()
    await cargaDelegadosI()
    await cargaConcepto()
    await batch()
    await cargaTipoEvento()
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

const cargaTipoEvento = async () =>{
    const tiposEvento = await TipoEvento.find()
    if(tiposEvento.length===0){
        await new TipoEvento({nombre: 'Partido Oficial', datosDeportivos: true}).save()
    }
}

const cargaConcepto = async () => {
    const conceptosCaja = await ConceptosCaja.find()
    if (conceptosCaja.length === 0) {
        await new ConceptosCaja({ nombre: 'Cobro de couta', tipo: 'Egreso' }).save()

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



        await new Pantalla({ 'nombre': 'Datos de jugador', 'menu': 'Jugador', 'opcionMenu': 'Datos de jugador', 'componente': 'ModificacionDatos', 'roles': [delegadoInst._id, jugador._id] }).save()
        await new Pantalla({ 'nombre': 'Informe de Pago', 'menu': 'Jugador', 'opcionMenu': 'Informe de Pago', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, jugador._id,] }).save()
        await new Pantalla({ 'nombre': 'Saldos y Movs.', 'menu': 'Jugador', 'opcionMenu': 'Saldos y Movs.', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, jugador._id,] }).save()
        await new Pantalla({ 'nombre': 'Datos deportivos', 'menu': 'Jugador', 'opcionMenu': 'Datos deportivos', 'componente': 'DatosDeportivosListaPage', 'roles': [delegadoInst._id, jugador._id,] }).save()
        await new Pantalla({ 'nombre': 'Cambiar Password', 'menu': 'Jugador', 'opcionMenu': 'Cambiar Passowrd', 'componente': 'ModificarPasswordPage', 'roles': [jugador._id, delegadoInst._id, delegado._id,] }).save()


        await new Pantalla({ 'nombre': 'Eventos', 'menu': 'Agenda', 'opcionMenu': 'Eventos', 'componente': 'ListaEventosPage', 'roles': [delegadoInst._id, jugador._id, delegado._id, dt._id,] }).save()
        await new Pantalla({ 'nombre': 'Fixture', 'menu': 'Agenda', 'opcionMenu': 'Fixture', 'componente': 'MantenimientoCampeonatosPage', 'roles': [delegadoInst._id, delegado._id, jugador._id, dt._id] }).save()


        await new Pantalla({ 'nombre': 'Registro de Pago', 'menu': 'Tesorería', 'opcionMenu': 'Registro de Pago', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, tesorero._id,] }).save()
        await new Pantalla({ 'nombre': 'Conceptos de Caja', 'menu': 'Tesorería', 'opcionMenu': 'Conceptos de Caja', 'componente': 'ConceptosDeCajaPage', 'roles': [delegadoInst._id, tesorero._id,] }).save()
        await new Pantalla({ 'nombre': 'Aprobación de Pago', 'menu': 'Tesorería', 'opcionMenu': 'Aprobación de Pago', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, tesorero._id,] }).save()
        await new Pantalla({ 'nombre': 'Ingreso Movimiento', 'menu': 'Tesorería', 'opcionMenu': 'Ingreso Movimiento', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, tesorero._id,] }).save()
        await new Pantalla({ 'nombre': 'Cons. Movimientos', 'menu': 'Tesorería', 'opcionMenu': 'Cons. Movimientos', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, delegado._id, tesorero._id,] }).save()
        await new Pantalla({ 'nombre': 'Cons. Mov y Sdo por Jugador', 'menu': 'Tesorería', 'opcionMenu': 'Cons. Mov y Sdo por Jugador', 'componente': 'PlaceHolderPage', 'roles': [delegadoInst._id, jugador._id, tesorero._id,] }).save()


        await new Pantalla({ 'nombre': 'Registro de datos', 'menu': 'Dirección Técnica', 'opcionMenu': 'Registro de datos', 'componente': 'ListaEventosPage', 'roles': [delegadoInst._id, dt._id,] }).save()
        await new Pantalla({ 'nombre': 'Datos de usuario', 'menu': 'Dirección Técnica', 'opcionMenu': 'Datos de usuario', 'componente': 'ModificacionDatos', 'roles': [delegadoInst._id, dt._id] }).save()
        await new Pantalla({ 'nombre': 'Cambiar Password', 'menu': 'Dirección Técnica', 'opcionMenu': 'Cambiar Passowrd', 'componente': 'ModificarPasswordPage', 'roles': [dt._id] }).save()
        await new Pantalla({ 'nombre': 'Plantel', 'menu': 'Dirección Técnica', 'opcionMenu': 'Plantel', 'componente': 'PlantelPage', 'roles': [delegadoInst._id,dt._id] }).save()



        await new Pantalla({ 'nombre': 'Categorías', 'menu': 'Delegado', 'opcionMenu': 'Categorías', 'componente': 'ListaCategoriasPage', 'roles': [delegadoInst._id,] }).save()
        await new Pantalla({ 'nombre': 'Plantel', 'menu': 'Delegado', 'opcionMenu': 'Plantel', 'componente': 'PlantelPage', 'roles': [delegadoInst._id, delegado._id,] }).save()
        await new Pantalla({ 'nombre': 'Creación de Usuario', 'menu': 'Delegado', 'opcionMenu': 'Creación de Usuario', 'componente': 'AltaDeUsuarioPage', 'roles': [delegadoInst._id, delegado._id,] }).save()
        await new Pantalla({ 'nombre': 'Datos Usuarios', 'menu': 'Delegado', 'opcionMenu': 'Datos Usuarios', 'componente': 'ConsultaModificacionDatosPage', 'roles': [delegadoInst._id, delegado._id,] }).save()
        await new Pantalla({ 'nombre': 'Mod perfiles y password', 'menu': 'Delegado', 'opcionMenu': 'Mod perfiles y password', 'componente': 'UsuariosEnCategoríaPage', 'roles': [delegadoInst._id, delegado._id,] }).save()
        await new Pantalla({ 'nombre': 'Campeonatos', 'menu': 'Delegado', 'opcionMenu': 'Campeonatos', 'componente': 'ListaCampeonatosPage', 'roles': [delegadoInst._id, delegado._id,] }).save()
        await new Pantalla({ 'nombre': 'Tipo de Eventos', 'menu': 'Delegado', 'opcionMenu': 'Tipo de Eventos', 'componente': 'TipoEventosPage', 'roles': [delegadoInst._id, delegado._id,] }).save()





    }

}

const cargaDelegadosI = async () => {
    const usuarios = await Usuario.find()
    if (usuarios.length === 0) {
        let correos = ['gab.arpe@gmail.com', 'nati.r0501@gmail.com']

        for (let i = 0; i < correos.length; i++) {
            let usuario = new Usuario({ 'email': correos[i], 'delegadoInstitucional': true })
            await usuario.generateAuthToken()
            usuario = await usuario.save()
            await usuario.enviarConfirmacionAlta()
        }

    }




}


const batch = async () => {
    try {
        const concepto = await ConceptosCaja.findOne({ nombre: 'Cobro de couta' })
        let usuarios
        
        cron.schedule('0 1 * * *', async () => {

            console.log( `### ${new Date()} CORRIENDO BATCH DE CUOTAS###`);
            let categorias = await Categoria.find({ diaGeneracionCuota: new Date().getDate() })
            for (let cat of categorias) {

                usuarios = await Usuario.find({ categoriacuota: cat._id })

                for (let usu of usuarios) {
                    let mesActual = new Date().getMonth() + 1
                    let cuenta = await Cuenta.findOne({ _id: usu.cuenta })
                    if (usu.ultimoMesCobrado < mesActual && mesActual < 13) {
                        let cantidadCuotas = mesActual - usu.ultimoMesCobrado

                        for (let i = 0; i < cantidadCuotas; i++) {
                            cuota = +usu.ultimoMesCobrado + 1 + i
                            await cuenta.movimientos.push(new Movimiento({
                                fecha: Date.now(),
                                monto: cat.valorCuota,
                                tipo: concepto.tipo,
                                concepto,
                                comentario: `Cobro cuota mes ${cuota}`

                            }))

                            cuenta.saldo = cuenta.saldo - cat.valorCuota
                            await cuenta.save()
                        }
                        usu.ultimoMesCobrado = mesActual
                        await usu.save()
                    }
                }

            }

        }, {
                scheduled: true,
                timezone: "America/Montevideo"
            });

    } catch (e) {
        console.log(e)
        console.log('Ocurrión un error en el proceso batch, comunique al analista')
    }
}


module.exports = { scriptInicial }
