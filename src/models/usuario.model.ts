import { Posiciones, Roles } from './enum.models';

function getDate() : string {
    let date = new Date()
    return date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()
}

export class Usuario{
    _id : string = '0';
    nombre?: string;
    apellido?: string;
    password?: string;
    ci?: string;
    celular?: string;
    direccion?: string;
    fechaVtoCarneSalud: number = Date.now()
 
    fechaNacimiento: number = Date.now()

    emergencia?: string;
    sociedad?: string;
    contacto?: string;
    posiciones ?: string[] =[]
    rol ?: string[];
    activo ?: boolean;


   
}