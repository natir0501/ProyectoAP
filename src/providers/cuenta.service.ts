import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilsServiceProvider } from "./utils.service";
import { UsuarioService } from "./usuario.service";
import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';

@Injectable()
export class CuentaService{

    apiUrl: string= ''
    
    constructor(public http: HttpClient, private utils: UtilsServiceProvider, 
        public usuarioServ: UsuarioService){
        
        this.apiUrl = this.utils.apiUrl;
    }

    obtenerMovimientos(_id: string):Observable<any> {
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        return this.http.get(`${this.apiUrl}api/movimientos/${_id}`, { headers })
      }

}