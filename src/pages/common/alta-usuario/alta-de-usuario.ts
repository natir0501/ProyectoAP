import { Categoria } from './../../../models/categoria.models';
import { Perfil } from './../../../models/usuario.model';

import { NgForm } from '@angular/forms';
import { UtilsServiceProvider } from './../../../providers/utils.service';
import { UsuarioService } from './../../../providers/usuario.service';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Usuario } from '../../../models/usuario.model';
import { CategoriaService } from '../../../providers/categoria.service';
import { Roles } from '../../../models/enum.models';

@Component({
  selector: 'page-alta-de-usuario',
  templateUrl: 'alta-de-usuario.html'
})
export class AltaDeUsuarioPage {

  categorias: Categoria[] = [];
  usuario: Usuario = new Usuario();
  roles = Object.keys(Roles).map(key => ({ 'id': key, 'value': Roles[key] }))
  perfiles: any = {}


  @ViewChild("form") formulario: NgForm

  constructor(public navCtrl: NavController, public usuarioServ: UsuarioService
    , public categoriaServ: CategoriaService, public utilServ: UtilsServiceProvider) {


  }

  async ionViewWillEnter() {
    let resp = await this.categoriaServ.obtenerCategorias().toPromise()
    await this.cargoPerfiles(resp)





  }

  cargoPerfiles(resp: any) {
    this.categorias = resp.data.categorias
    for (let cat of this.categorias) {
      this.perfiles[cat._id] = []

    }
    

  }

  armoPerfiles(){
    let perfiles = []
    let keys = Object.keys(this.perfiles)
    for (let key of keys){
      perfiles.push({
        'categoria':key,
        'roles': this.perfiles[key]
      })
    }
    this.usuario.perfiles = perfiles
    
  }

  ionViewDidLoad() {


  }

  onSubmit() {
    
    this.armoPerfiles()
    console.log(this.usuario)

     
    this.usuarioServ.altaUsuario(this.usuario)
      .subscribe(
        (resp) => {
          this.utilServ.dispararAlert("Gol!", "Usuario creado correctamente.")
          this.usuario.email = ''
          
          this.usuario.categoriacuota = null
          
        },
        (err) => {
          console.log("Error creando usuario", err)
          this.utilServ.dispararAlert("Error", "Ocurrió un error al crear usuario")
        }
      ) 

  }

}
