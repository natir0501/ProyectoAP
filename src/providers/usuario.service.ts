import { Usuario } from './../models/usuario.model';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

@Injectable()
export class UsuarioService{
    //apiUrl: string = 'http://localhost:3000/'
    apiUrl: string = ''
    token: string;
    usuario: Usuario = new Usuario()
    constructor(private http: HttpClient, private storage: Storage  ){

    }

    public getUserByToken(token: string): Observable<any>{
        
        return this.http.get<any>(this.apiUrl+'api/usuarios/'+token)
        
    }

    public setTokenInStorage(token: string){
        this.token = token
        
        this.storage.set('apiToken', token)
        
    }

    public actualizarUsuario(usuario: Usuario): Observable<any>{
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        console.log(this.token)
        headers = headers.set('x-auth',this.token)
        
        console.log(headers)

        return this.http.put(`${this.apiUrl}api/usuarios/${usuario._id}`,usuario,{headers})
    }
}