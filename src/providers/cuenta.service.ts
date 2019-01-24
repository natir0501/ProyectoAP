import { Movimiento } from './../models/cuenta.models';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilsServiceProvider } from "./utils.service";
import { UsuarioService } from "./usuario.service";
import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable()
export class CuentaService {

  rechazarPago(movimiento: Movimiento, _id: string): any {

    let pago = {
        jugadorid: movimiento.usuario._id,
        idmov: movimiento._id,
        monto: movimiento.monto,
        referencia : movimiento.referencia,
        comentario: movimiento.comentario_tes
    }    
    let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
    headers = headers.set('x-auth', this.usuarioServ.token)
    return this.http.patch(`${this.apiUrl}api/pagos/rechazo/${_id}`, pago, { headers })
    
  
}


  confirmarPago(movimiento: Movimiento, _id: string): any {

    let pago = {
        jugadorid: movimiento.usuario._id,
        idmov: movimiento._id,
        monto: movimiento.monto,
        referencia : movimiento.referencia,
        comentario: movimiento.comentario_tes
    }    
    let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
    headers = headers.set('x-auth', this.usuarioServ.token)
    return this.http.patch(`${this.apiUrl}api/pagos/confirmacion/${_id}`, pago, { headers })
  }

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

    obtenerCuenta(_id: string): Observable<any>{
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        return this.http.get<any>(`${this.utils.apiUrl}api/cuenta/${_id}`,{ headers })
    }


}
