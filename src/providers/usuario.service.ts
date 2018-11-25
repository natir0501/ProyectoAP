import { Usuario } from './../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

@Injectable()
export class UsuarioService {
    //apiUrl: string = 'http://localhost:3000/'
    apiUrl: string = ''
    token: string;
    usuario: Usuario
    constructor(private http: HttpClient, private storage: Storage) {

    }

    public getUserByToken(token: string): Observable<any> {

        return this.http.get<any>(this.apiUrl + 'api/usuarios/' + token)

    }

    

    public async tokenGuardado() {
        try{
            let token = await this.storage.get('apiToken')
            if (token){
                return token
            }
            return undefined
        }catch(e){
            console.log(e)
            return undefined
        }
       
       
    }

    public async getActualUser() {
        try {
            if (!this.usuario) {
                let token = await this.storage.get('apiToken')
                this.token = token;
                let resp = await this.getUserByToken(token).toPromise()
                console.log(resp,'Respuesta')
                this.usuario = resp.data
                return this.usuario
            }
        }
        catch (e) {
            console.log(e)
            return this.usuario
        }
    }

    public actualizarUsuario(usuario: Usuario): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        
        headers = headers.set('x-auth', this.token)

        console.log(headers)

        return this.http.put(`${this.apiUrl}api/usuarios/${usuario._id}`, usuario, { headers })
    }

    public login(usuario: Usuario): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
        return this.http.post(`${this.apiUrl}api/usuarios/login`, usuario, { headers })
    }

    public setUsuario(usuario: Usuario){
    
        this.storage.set('apiToken',usuario.tokens[0].token)
        this.usuario = usuario
    }

    public logOut(){
        this.token = ''
        return this.storage.remove('apiToken')
        
    }
}