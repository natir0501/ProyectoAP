
export class Campeonato{
    _id?: string
    nombre?: string
    anio?: number
    fechas?: Fecha[] = []
}

export class Fecha {
    numeroFecha?: number
    fechaEncuentro?: number
    rueda?: number
    partido?:Object
}