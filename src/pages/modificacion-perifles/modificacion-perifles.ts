import { UsuariosEnCategoriaPage } from './../usuarios-en-categoria/usuarios-en-categoria';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Categoria } from '../../models/categoria.models';
import { Usuario } from '../../models/usuario.model';
import { Roles } from '../../models/enum.models';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../providers/usuario.service';
import { CategoriaService } from '../../providers/categoria.service';
import { UtilsServiceProvider } from '../../providers/utils.service';

/**
 * Generated class for the ModificacionPeriflesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificacion-perifles',
  templateUrl: 'modificacion-perifles.html',
})
export class ModificacionPeriflesPage {

  categorias: Categoria[] = [];
  categoriasCuotas: Categoria[] = [];
  usuario: Usuario = new Usuario();
  roles = Object.keys(Roles).map(key => ({ 'id': key, 'value': Roles[key] }))
  rolesBack = []
  perfiles: any = {}


  @ViewChild("form") formulario: NgForm
 

  constructor(public navCtrl: NavController, public usuarioServ: UsuarioService, public navParams: NavParams,
    private load: LoadingController, public categoriaServ: CategoriaService, public utilServ: UtilsServiceProvider) {


  }

  async ionViewWillEnter() {
    let loader = this.load.create({
      content: 'Cargando',
      spinner: 'circles'
    })
    loader.present()
    let categoriasData = await this.categoriaServ.obtenerCategorias().toPromise()
    this.categoriasCuotas = categoriasData.data.categorias
    let catId = this.usuarioServ.usuario.perfiles[0].categoria
    let resp = await this.categoriaServ.obtenerCategoria(catId).toPromise()
    this.usuario = this.navParams.get('usuario')
    let resp2 = await this.categoriaServ.obtenerRoles().toPromise()
    this.rolesBack = resp2.data.roles

    await this.cargoPerfiles(resp)
    loader.dismiss()
  }

  cargoPerfiles(resp: any) {
    this.categorias = [resp.data.categoria]
    let roles = []
    for (let perfil of this.usuario.perfiles) {
      if (perfil.categoria === this.categorias[0]._id) {
        roles = perfil.roles
      }
    }
    for (let i = 0; i < roles.length; i++) {
      roles[i] = {
        _id: roles[i],
        codigo: this.rolesBack.filter((elem) => elem._id === roles[i])[0].codigo
      }
    }

    for (let cat of this.categorias) {
      this.perfiles[cat._id] = [...roles.map(ele => ele.codigo)]
    }
  }

  armoPerfiles() {
    let perfiles = []
    let keys = Object.keys(this.perfiles)
    for (let key of keys) {
      perfiles.push({
        'categoria': key,
        'roles': this.perfiles[key]
      })
    }
    this.usuario.perfiles = perfiles

  }

  ionViewDidLoad() {


  }

  onSubmit() {
    let loader = this.load.create({
      content: 'Cargando',
      spinner: 'circles'
    })
    loader.present()
    this.armoPerfiles()


    this.usuarioServ.modificarPerfil(this.usuario)
      .subscribe(
        (resp) => {
          this.utilServ.dispararAlert("Listo!", "Usuario modificado correctamente.")
          this.navCtrl.setRoot(UsuariosEnCategoriaPage)
          loader.dismiss()
        },
        (err) => {
          console.log("Error modificando usuario", err)
          this.utilServ.dispararAlert("Error", "Ocurrió un error al modificar usuario")
          loader.dismiss()
        }
      )

  }

  mostrarUsuario(usuario: Usuario) {
    let etiqueta: String = ''
    etiqueta = usuario.nombre ? etiqueta + ' ' + usuario.nombre : etiqueta
    etiqueta = usuario.apellido ? etiqueta + ' ' + usuario.apellido : etiqueta
    etiqueta = etiqueta === '' ? ` (${usuario.email})` : etiqueta
    return etiqueta
  }

}
