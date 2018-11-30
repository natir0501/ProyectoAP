import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MantenimientoTipoEventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mantenimiento-tipo-eventos',
  templateUrl: 'mantenimiento-tipo-eventos.html',
})
export class MantenimientoTipoEventosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MantenimientoTipoEventosPage');
  }

  onSubmit() {
    console.log("something");
    
  }

}
