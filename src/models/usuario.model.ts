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
    documento?: string;
    celular?: string;
    direccion?: string;
    fmedica?: {vigente: boolean, fvenc: string} = {vigente:false, fvenc: getDate()};
    fnac?: string = getDate();
    emergencia?: string;
    sociedad?: string;
    contacto?: string;
    posiciones ?: string[] 
    rol ?: Roles;
    activo ?: boolean;


   
}