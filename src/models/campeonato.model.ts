import { PatternValidator } from "@angular/forms";

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
    partido?: Partido= new Partido()
}

export class Partido{
    rival?: string
    golesPropios? : number
    golesRival?: number
    local?: String
    lugar?: Lugar= new Lugar()
}

export class Lugar{
    nombre? : string
    direccion? : string
    linkUbicacion? : string
}


