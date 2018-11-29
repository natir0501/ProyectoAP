import { NgForm } from '@angular/forms';
import { UtilsServiceProvider } from './../../../providers/utils.service';
import { UsuarioService } from './../../../providers/usuario.service';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Categoria } from '../../../models/categoria.models';
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

  @ViewChild("form") formulario: NgForm

  constructor(public navCtrl: NavController, public usuarioServ: UsuarioService
    , public categoriaServ: CategoriaService, public utilServ: UtilsServiceProvider) {


  }

  ionViewDidLoad() {

    this.categoriaServ.obtenerCategorias()
      .subscribe(
        (resp) => {

          this.categorias = resp.data.categorias
        },
        (err) => {
          console.log("Error obteniendo categorías", err)
          this.utilServ.dispararAlert("Error", "Ocurrió un error al obtener las categorías")
        }
      )
  }

  onSubmit() {

    this.usuarioServ.altaUsuario(this.usuario)
      .subscribe(
        (resp) => {
          this.utilServ.dispararAlert("Gol!", "Usuario creado correctamente.")
          this.usuario.email = ''
          this.usuario.categorias = []
          this.usuario.categoriacuota = null
          this.usuario.roles = []
        },
        (err) => {
          console.log("Error creando usuario", err)
          this.utilServ.dispararAlert("Error", "Ocurrió un error al crear usuario")
        }
      )

  }

}
