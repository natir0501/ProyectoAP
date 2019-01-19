import { UtilsServiceProvider } from './../../../providers/utils.service';
import { CuentaService } from './../../../providers/cuenta.service';
import { Cuenta } from './../../../models/cuenta.models';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CategoriaService } from '../../../providers/categoria.service';
import { Categoria } from '../../../models/categoria.models';
import { UsuarioService } from '../../../providers/usuario.service';

/**
 * Generated class for the SaldoMovimientosCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-saldo-movimientos-categoria',
  templateUrl: 'saldo-movimientos-categoria.html',
})
export class SaldoMovimientosCategoriaPage {

  cuenta: Cuenta = new Cuenta();
  categoria: Categoria = new Categoria()


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public cuentaServ: CuentaService, public loadingCtrl: LoadingController
    , public utilServ: UtilsServiceProvider, public catService: CategoriaService,
    public usuServ: UsuarioService) {
  }

  async ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando',
      spinner: 'circles'
    });
    loading.present();

    this.categoria._id = this.usuServ.usuario.perfiles[0].categoria
    let dataUsuarios: any = await this.catService.obtenerCategoria(this.categoria._id).toPromise()
    if (dataUsuarios) {
      this.categoria = dataUsuarios.data.categoria
    }
  console.log("Aca la categoría", this.categoria)
    this.cuenta= this.categoria.cuenta
    console.log("Aca la cuenta", this.cuenta);
    
    this.cuentaServ.obtenerMovimientos(this.cuenta._id)
      .subscribe((resp) => {
        this.cuenta.movimientos = resp.data.movimientos;
      },
        (err) => {
          console.log("Error obteniendo movimientos", err)
          this.utilServ.dispararAlert("Error", "Ocurrió un error al obtener los movimientos")
          loading.dismiss();
        }, () => {
          loading.dismiss();
        })
  }

  ingresarMovimiento() {
    console.log("a nuevo mov");

  }

  verDetalle(mov) {
    console.log(mov);
  }

}
