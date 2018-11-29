import { UtilsServiceProvider } from './utils.service';
import { UsuarioService } from './usuario.service';
import { Categoria } from './../models/categoria.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';



@Injectable()
export class CategoriaService{
    
    apiUrl: string 
    constructor(public http:HttpClient, private utils: UtilsServiceProvider, public usuarioServ: UsuarioService){
        this.apiUrl = this.utils.apiUrl
    }

    obtenerCategorias():Observable<any>{

        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        
        headers = headers.set('x-auth', this.usuarioServ.token)

        return this.http.get(`${this.apiUrl}api/categorias`, { headers })
    }


    
}