import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-registro-pago-cuota',
  templateUrl: 'registro-pago-cuota.html',
})
export class RegistroPagoCuotaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPagoCuotaPage');
  }

}
