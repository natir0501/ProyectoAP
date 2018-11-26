import { Concepto } from './../models/categoria.models';
import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConceptoService{
    apiUrl: string="http://localhost:3000/"
    //apiUrl: string = ''
    constructor(public http: HttpClient, public usuarioServ: UsuarioService){
    }

    agregarConcepto(concepto : Concepto):Observable<any>{

        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        headers = headers.set('x-auth', this.usuarioServ.token)
        return this.http.post(`${this.apiUrl}api/conceptoscaja`,concepto, { headers })
    }

}