import { Movimiento } from './../models/cuenta.models';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilsServiceProvider } from "./utils.service";
import { UsuarioService } from "./usuario.service";
import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';

@Injectable()
export class CuentaService {

    obtenerMovimientosPendientes(_id: string): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        return this.http.get(`${this.apiUrl}api/movimientospendientes/${_id}`, { headers })
    }

    apiUrl: string = ''

    constructor(public http: HttpClient, private utils: UtilsServiceProvider,
        public usuarioServ: UsuarioService) {

        this.apiUrl = this.utils.apiUrl;
    }

    obtenerMovimientos(_id: string): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        return this.http.get(`${this.apiUrl}api/movimientos/${_id}`, { headers })
    }

    ingresarMovimiento(): Observable<any> {
        return
    }

    registrarPagoCuota(movimiento: Movimiento): Observable<any> {
        let pago = {
            jugadorid: movimiento.jugador._id,
            usuarioid: movimiento.usuario._id,
            concepto: movimiento.concepto._id,
            monto: movimiento.monto,
            comentario: movimiento.comentario
        }
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        return this.http.post(`${this.apiUrl}api/pagos`, pago, { headers })
    }
}

