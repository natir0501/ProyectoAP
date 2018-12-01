import { UtilsServiceProvider } from './../../../providers/utils.service';
import { CuentaService } from './../../../providers/cuenta.service';
import { Cuenta } from './../../../models/cuenta.models';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the SaldoMovimientosCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saldo-movimientos-categoria',
  templateUrl: 'saldo-movimientos-categoria.html',
})
export class SaldoMovimientosCategoriaPage {

  cuenta : Cuenta = new Cuenta();
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public cuentaServ: CuentaService, public loadingCtrl : LoadingController
    , public utilServ: UtilsServiceProvider ){
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando',
      spinner: 'circles'
    });
    loading.present();

    this.cuenta= this.navParams.get("cuenta")

    this.cuentaServ.obtenerMovimientos(this.cuenta._id)    
      .subscribe((resp) => {
        this.cuenta.movimientos = resp.data.movimientos;
        console.log(this.cuenta);
      },
        (err) => {
          console.log("Error obteniendo movimientos", err)
          this.utilServ.dispararAlert("Error", "Ocurrió un error al obtener los movimientos")
          loading.dismiss();
        }, () => {
          loading.dismiss();
        })
  }

  ingresarMovimiento(){
    console.log("a nuevo mov");
    
  }

}
