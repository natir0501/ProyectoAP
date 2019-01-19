import { ConceptoCaja } from './concepto.models';
import { Usuario } from './usuario.model';


export class Cuenta{
    _id?:  string=''
    movimientos? : Movimiento[] = []
    saldo?: number
}

export class Movimiento{
        _id?:string
        fecha?: number
        monto?: number
        tipo?: string 
        concepto?: ConceptoCaja
        comentario?:string
        confirmado?: boolean
        referencia?: string
        usuario?:Usuario
        jugador?:Usuario
}

