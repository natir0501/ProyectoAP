import { Campeonato } from './../models/campeonato.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilsServiceProvider } from "./utils.service";
import { Observable } from "rxjs/Observable";
import { UsuarioService } from "./usuario.service";



@Injectable()
export class CampeonatoService {

    apiUrl: string = ''

    constructor(public http: HttpClient, public utils: UtilsServiceProvider,
        public usuarioServ: UsuarioService) {
        this.apiUrl = this.utils.apiUrl
    }

    obtenerCampeonatos(): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        return this.http.get(`${this.apiUrl}api/campeonatos`, { headers })
    }

    agregarCampeonato(campeonato : Campeonato):Observable<any>{
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        return this.http.post(`${this.apiUrl}api/campeonato`,campeonato, { headers })
    }

    
    actualizarCampeonato(campeonato : Campeonato):Observable<any>{
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        return this.http.put(`${this.apiUrl}api/campeonato/${campeonato._id}`, { headers })
    }


}