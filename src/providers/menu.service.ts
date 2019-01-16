import { ModificacionDatosPage } from './../pages/modificacion-datos/modificacion-datos';
import { ConsultaModificacionDatosPage } from './../pages/consulta-modificacion-datos/consulta-modificacion-datos';
import { MantenimientoCampeonatosPage } from './../pages/common/mantenimiento-campeonatos/mantenimiento-campeonatos';
import { ListaCampeonatosPage } from './../pages/common/lista-campeonatos/lista-campeonatos';
import { ListaEventosPage } from './../pages/lista-eventos/lista-eventos';
import { ModificarPasswordPage } from './../pages/modificar-password/modificar-password';
import { UsuariosEnCategoriaPage } from './../pages/usuarios-en-categoria/usuarios-en-categoria';
import { CategoriaService } from './categoria.service';
import { Categoria } from './../models/categoria.models';
import { UtilsServiceProvider } from './utils.service';
import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu, MenuItem } from './../models/menu.models';
import { ListaCategoriasPage } from '../pages/lista-categorias/lista-categorias';
import { AltaDeUsuarioPage } from '../pages/common/alta-usuario/alta-de-usuario';
import { MantenimientoCategoriaPage } from '../pages/mantenimiento-categoria/mantenimiento-categoria';
import { Injectable } from '@angular/core';
import { PlaceHolderPage } from '../pages/place-holder/place-holder';
import { ConceptosDeCajaPage } from '../pages/Backoffice/conceptos-de-caja/conceptos-de-caja';
import { TipoEventosPage } from '../pages/Backoffice/tipo-eventos/tipo-eventos';
import { Observable } from 'rxjs/Observable';
import { Usuario, Perfil } from '../models/usuario.model';

@Injectable()
export class MenuService {
    apiUrl: string = ''
    map = new Map();
    categoriasUsuario: Categoria[] = []
    perfilesUsuario: Perfil[] = []
    categoriaSeleccionada: Categoria
    
    menus: Menu[] = [
        new Menu('Jugador', 'football', 'add'),
        new Menu('Agenda', 'calendar', 'add'),
        new Menu('Tesorería', 'cash', 'add'),
        new Menu('Dirección Técnica', 'person', 'add'),
        new Menu('Back Office', 'build', 'add')
    ]



    constructor(private http: HttpClient, private usuarioServ: UsuarioService, private utils: UtilsServiceProvider,
        private catServ: CategoriaService) {
        this.apiUrl = this.utils.apiUrl
        this.map.set('ListaCategoriasPage', ListaCategoriasPage)
        this.map.set('PlaceHolderPage', PlaceHolderPage)
        this.map.set('AltaDeUsuarioPage', AltaDeUsuarioPage)
        this.map.set('ConceptosDeCajaPage', ConceptosDeCajaPage)
        this.map.set('TipoEventosPage', TipoEventosPage)
        this.map.set('UsuariosEnCategoríaPage',UsuariosEnCategoriaPage)
        this.map.set('ModificarPasswordPage', ModificarPasswordPage)
        this.map.set('ListaCampeonatosPage', ListaCampeonatosPage)
        this.map.set('ListaEventosPage',ListaEventosPage)
        this.map.set('MantenimientoCampeonatosPage',MantenimientoCampeonatosPage)
        this.map.set('ConsultaModificacionDatosPage',ConsultaModificacionDatosPage)
        this.map.set('ModificacionDatos',ModificacionDatosPage)


    }

    async getMenu(roles: string[]) {
        
        let resp = await this.obtenerPantallas(roles).toPromise()
        let pantallas = resp.data
        this.limpiarMenu()
        
        
        for (let i = 0; i < pantallas.length; i++) {
            switch (pantallas[i].menu) {
                case 'Jugador': {
                    this.menus[0].sub.push(new MenuItem(pantallas[i].nombre, this.getPantalla(pantallas[i].componente)))
                    break;
                }
                case 'Agenda': {
                    this.menus[1].sub.push(new MenuItem(pantallas[i].nombre, this.getPantalla(pantallas[i].componente)))
                    break;
                }
                case 'Tesorería': {
                    this.menus[2].sub.push(new MenuItem(pantallas[i].nombre, this.getPantalla(pantallas[i].componente)))
                    break;
                }
                case 'Dirección Técnica': {
                    this.menus[3].sub.push(new MenuItem(pantallas[i].nombre, this.getPantalla(pantallas[i].componente)))
                    break;
                }
                case 'Back Office': {
                    this.menus[4].sub.push(new MenuItem(pantallas[i].nombre, this.getPantalla(pantallas[i].componente)))
                    break;
                }
            }
        }



     
      
        
        return this.filtrarMenu()


    }

    async menuDelegadoInstitucional(usuario: Usuario){
        let bo = new Menu('Back Office','build', 'add')
        bo.sub.push(new MenuItem('Categorías', ListaCategoriasPage))
        return [bo]
       
    }

    async switchCategoría(usuario: Usuario) : Promise<Menu> {
        try{
            let menu : Menu =  new Menu('Categorias', 'contacts', 'add')
            this.perfilesUsuario = [...usuario.perfiles]
            for(let i = 0; i < usuario.perfiles.length; i++){
                let categoria: Categoria = undefined
                let resp: any = await this.catServ.obtenerCategoria(usuario.perfiles[i].categoria).toPromise()
               
                categoria = resp.data.categoria
                if(categoria){
                    this.categoriasUsuario.push(categoria)
                    menu.sub.push(new MenuItem(categoria.nombre, {'categoria': categoria._id}))
                }
            }
         
            return menu
        }catch(e){
            console.log(e)
            return undefined
        }
        
    }
    
    async switchCategoríaInterno() : Promise<Menu> {
        try{
            let menu : Menu =  new Menu('Categorias', 'contacts', 'add')
           
            for(let i = 0; i < this.categoriasUsuario.length; i++){
                if(this.categoriasUsuario[i]._id !== this.categoriaSeleccionada._id){
                    
                    menu.sub.push(new MenuItem('Cambiar a '+this.categoriasUsuario[i].nombre, {'categoria': this.categoriasUsuario[i]._id}))
                }
            }
            
            return menu
        }catch(e){
            console.log(e)
            return undefined
        }
        
    }
 

    getPantalla(nombreComponente: string) {
        let retorno = this.map.get(nombreComponente)
        if (!retorno) {
            return PlaceHolderPage
        }
        return this.map.get(nombreComponente)
    }
    filtrarMenu(): Menu[]{
        let menuLimpio : Menu[] = []
        for(let i = 0 ; i< this.menus.length; i++){
            if(this.menus[i].sub.length > 0){
                menuLimpio.push(this.menus[i])
            }
        }
        return menuLimpio
    }

    limpiarMenu(){
        
        for(let i = 0 ; i< this.menus.length; i++){
           this.menus[i].sub = []
        }
        
    }

    obtenerPantallas(roles: string[]): Observable<any> {

        let headers: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json")

        headers = headers.set('x-auth', this.usuarioServ.token)

        return this.http.post(`${this.utils.apiUrl}api/pantallas`, { roles }, { headers })
    }

    async cambioCategoria(cat_id: string){
        
        try{
        let resp : any = await this.catServ.obtenerCategoria(cat_id).toPromise()
        if(resp){
            this.categoriaSeleccionada = resp.data.categoria
            
            for(let perfil of this.perfilesUsuario){
                if(perfil.categoria === cat_id){

                    this.usuarioServ.seleccionarPerfil(perfil)
                }
            }


            

        }
        }catch(e){
            console.log(e)
        }
    }

    async nombreCategoria(cat_id : string){
        try{
            let resp: any = await this.catServ.obtenerCategoria(cat_id).toPromise()
            if(resp){
                return resp.data.categoria.nombre
            }
        }catch(e){
            console.log(e)
            return ''
        }
    }

    
}