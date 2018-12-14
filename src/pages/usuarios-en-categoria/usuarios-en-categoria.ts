import { Categoria } from './../../models/categoria.models';
import { UsuarioService } from './../../providers/usuario.service';
import { PlaceHolderPage } from './../place-holder/place-holder';
import { MenuService } from './../../providers/menu.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CategoriaService } from '../../providers/categoria.service';
import { UtilsServiceProvider } from '../../providers/utils.service';
import { MantenimientoCategoriaPage } from '../mantenimiento-categoria/mantenimiento-categoria';
import { Usuario } from '../../models/usuario.model';
import * as _ from 'lodash';
import { ModificacionPeriflesPage } from '../modificacion-perifles/modificacion-perifles';

/**
 * Generated class for the UsuariosEnCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuarios-en-categoria',
  templateUrl: 'usuarios-en-categoria.html',
})
export class UsuariosEnCategoriaPage {

  categoria: Categoria =  new Categoria();
  usuarios: Usuario[] = []


  constructor(public navCtrl: NavController, public navParams: NavParams, private menuServ: MenuService
    , public catService: CategoriaService, public utilServ: UtilsServiceProvider, private usuServ: UsuarioService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando',
      spinner: 'circles'
    });
    loading.present()
    this.categoria._id = this.usuServ.usuario.perfiles[0].categoria

    this.catService.obtenerCategoria(this.categoria._id)
      .subscribe((resp) => {

        this.usuarios = _.uniqBy( [...resp.data.categoria.delegados,
          ...resp.data.categoria.tesoreros,
          ...resp.data.categoria.dts,
          ...resp.data.categoria.jugadores,
        ], '_id')
        this.categoria = resp.data.categoria



      },
        (err) => {
          console.log("Error al obtener usuarios", err)
          this.utilServ.dispararAlert("Error", "Ocurrió un error al obtener los usuarios")
          loading.dismiss();
        }, () => {
          loading.dismiss();
        })
  }



  modificar(usuario: Usuario) {
    
    this.navCtrl.setRoot(ModificacionPeriflesPage, { usuario })
  }

  mostrarUsuario(usuario: Usuario){
    let etiqueta: String = ''
    etiqueta = usuario.nombre ? etiqueta +' ' + usuario.nombre : etiqueta
    etiqueta = usuario.apellido ? etiqueta + ' ' +usuario.apellido : etiqueta 
    etiqueta = etiqueta ==='' ? ` (${usuario.email})` : etiqueta
    return etiqueta
  }

}
