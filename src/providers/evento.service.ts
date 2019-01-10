import { Evento } from './../models/evento.models';
import { TipoEvento } from './../models/tipo.evento.models';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { UtilsServiceProvider } from './utils.service';
import { UsuarioService } from './usuario.service';

@Injectable()
export class EventoService {
    apiUrl : string = ''
    constructor(public http: HttpClient, public utils: UtilsServiceProvider, public usuarioServ: UsuarioService){
        this.apiUrl = this.utils.apiUrl
    }
    
    obtenerTipoEventos():Observable<TipoEvento[]>{
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        return this.http.get<any>(`${this.apiUrl}api/tipoeventos`, { headers })
        
    }

    altaEvento(evento : Evento): Observable<any>{
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        return this.http.post<any>(`${this.apiUrl}api/eventos`,evento, { headers })
    }

    obtenerEventos(fechaInicio: number, fechaFin: number): Observable<any>{
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        let params : HttpParams = new HttpParams().set('fechaInicio', fechaInicio.toString());
        params = params.set('fechaFin', fechaFin.toString());
        return this.http.get<any>(`${this.apiUrl}api/eventos`, { headers, params })
    }

    modificarEvento(evento: Evento, notificar: boolean): Observable<any>{
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        let params : HttpParams = new HttpParams().set('notificar', ''+notificar);
        return this.http.put<any>(`${this.apiUrl}api/eventos/${evento._id}`,evento, { headers,params })
    }

    cancelarEvento(evento: Evento){
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        
        return this.http.delete<any>(`${this.apiUrl}api/eventos/${evento._id}`, { headers })
    }
}