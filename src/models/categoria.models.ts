import { Usuario } from "./usuario.model";

export class Categoria{
    _id?: string
    nombre?: string
    valorCuota?: number
    diaGeneracionCuota?: number
    diaVtoCuota?: number
    cantidadCoutasAnuales?: number
    cuenta?: Cuenta
    dts?: Usuario[] = []
    delegados?: Usuario[] = []
    tesoreros?: Usuario[] = []
    jugadores?: Usuario[] = []
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