import { Posiciones, Roles } from './enum.models';
import { Categoria } from './categoria.models';

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
    tokens?: any[]
    emergencia?: string;
    sociedad?: string;
    contacto?: string;
    posiciones ?: string[] =[]
    activo ?: boolean;
    perfiles:  Perfil[] = []
    categoriacuota ?: Categoria;
    ultimoMesCobrado?: number


   
}

export class Perfil{
    categoria?: string
    roles?: string [] = []
}