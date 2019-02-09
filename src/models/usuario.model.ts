import { Categoria } from './categoria.models';
import { Cuenta } from './cuenta.models';

function getDate() : string {
    let date = new Date()
    return date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()
}

export class Usuario{
    _id : string = '0';
    email?: string;
    nombre?: string ='';
    apellido?: string;
    password?: string;
    ci?: string;
    celular?: string;
    direccion?: string;
    fechaVtoCarneSalud: number = Date.now()
    delegadoInstitucional?: boolean 
    fechaNacimiento: number = Date.now()
    fechaUltimoExamen: number = Date.now()
    requiereExamen: boolean = true
    tokens?: any[]
    emergencia?: string;
    sociedad?: string;
    contacto?: string;
    posiciones ?: string[] =[]
    activo ?: boolean;
    perfiles:  Perfil[] = []
    categoriacuota ?: Categoria;
    ultimoMesCobrado?: number;
    cuenta?: Cuenta;
    notificacionesEmail?: boolean = true;


   
}

export class Perfil{
    categoria?: string
    roles?: string [] = []
}