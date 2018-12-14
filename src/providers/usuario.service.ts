import { UtilsServiceProvider } from './utils.service';

import { Usuario, Perfil } from './../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsuarioService {

    apiUrl: string = ''
    token: string;
    usuario: Usuario

    usuConectado : Observable<Usuario>
    private usuSubject: Subject<Usuario>

    constructor(private http: HttpClient, private storage: Storage, private util: UtilsServiceProvider) {
        this.apiUrl = this.util.apiUrl
        this.usuSubject = new Subject<Usuario>()
        this.usuConectado = this.usuSubject.asObservable()
        
    }

    public getUserByToken(): Observable<any> {
        
        return this.http.get<any>(this.apiUrl + 'api/usuarios/' + this.token)

    }




    public async recuperoUsuario() {
        try {
           
           
                let token = await this.storage.get('apiToken')
              
                if (token) {
                    
                    this.token = token;
                   
                    let resp = await this.getUserByToken().toPromise()
                    this.setUsuario(resp.data.usuario)
                    return
                }
                return this.usuSubject.next(undefined)
            
            
        }
        catch (e) {
            console.log(e)
            this.token = undefined
            return this.usuSubject.next(undefined)
        }
    }

    public actualizarUsuario(usuario: Usuario): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")

        headers = headers.set('x-auth', this.token)

        return this.http.put(`${this.apiUrl}api/usuarios/${usuario._id}`, usuario, { headers })
    }

    public async login(usuario: Usuario) {

        try{
            let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")
            let respLogin: any = await  this.http.post(`${this.apiUrl}api/usuarios/login`, usuario, { headers }).toPromise()

            if(respLogin.usuario){
                this.setUsuario(respLogin.usuario)
                return this.usuario
            }
            return undefined
        }
        catch(e){
            console.log(e)
            return undefined
        }

        
    }

    public setUsuario(usuario: Usuario) {
        
        this.storage.set('apiToken', usuario.tokens[0].token)
        this.token = usuario.tokens[0].token
        this.usuario = usuario
     
        this.usuSubject.next(this.usuario)
        
    }

    public logOut() {
        this.token = ''
        this.usuario = undefined
        this.usuSubject.next(this.usuario)
        return this.storage.remove('apiToken')

    }

    public altaUsuario(usu: Usuario): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")

        headers = headers.set('x-auth', this.token)

        return this.http.post(`${this.apiUrl}api/usuarios`, usu, { headers })
    }

    public getRoles(rolesId: string[]): Observable<any>{
        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")

        headers = headers.set('x-auth', this.token)

        return this.http.post(`${this.apiUrl}api/roles`, {rolesId}, { headers })
    }

    seleccionarPerfil(perfil : Perfil){
        
        this.usuario.perfiles = [perfil]
        
        this.usuSubject.next(this.usuario)

    }
}