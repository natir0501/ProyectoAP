import { Campeonato } from './campeonato.model';
import { Usuario } from "./usuario.model";

export class Categoria{
    _id?: string
    nombre?: string
    valorCuota?: number
    diaGeneracionCuota?: number
    diaVtoCuota?: number
    cantidadCuotasAnuales?: number
    saldoInicial: number
    cuenta?: Cuenta
    requiereEscolaridad?: boolean = false
    dts?: Usuario[] = []
    delegados?: Usuario[] = []
    tesoreros?: Usuario[] = []
    jugadores?: Usuario[] = []
    campeonatos?: Campeonato[]=[]
}

export class Cuenta {
    movimintos?: Movimiento[] = []
    saldo?: number
}

export class Movimiento{
    fecha?: number
    monto?: number
    tipo?: string
    concepto?: Concepto
    comentario?: string
}

export class Concepto{
    nombre?: string
    tipo?: string
}