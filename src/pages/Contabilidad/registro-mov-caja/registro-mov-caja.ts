import { ConceptoCaja } from './../../../models/concepto.models';
import { Component } from '@angular/core';
import { CuentaService } from './../../../providers/cuenta.service';
import { Cuenta } from './../../../models/cuenta.models';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UtilsServiceProvider } from '../../../providers/utils.service';

@IonicPage()
@Component({
  selector: 'page-registro-mov-caja',
  templateUrl: 'registro-mov-caja.html',
})
export class RegistroMovCajaPage {

  conceptos: ConceptoCaja[] = [];
  concepto : ConceptoCaja = new ConceptoCaja()
  cuenta : Cuenta = new Cuenta()
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public cuentaServ: CuentaService, public loadingCtrl : LoadingController
    , public utilServ: UtilsServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroMovCajaPage');
  }

  onSubmit() {}

}
