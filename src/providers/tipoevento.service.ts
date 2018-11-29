import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
//import { TipoEvento } from '../models/tipo.evento.models';

@Injectable()
export class TipoEventoService{
    apiUrl: string="http://localhost:3000/"
    //apiUrl: string = ''
    constructor(public http: HttpClient, public usuarioServ: UsuarioService){
    }

    obtenerEventos() :Observable<any>{
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        return this.http.get(`${this.apiUrl}api/tipoeventos`, { headers })
    }

}