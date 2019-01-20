import { UtilsServiceProvider } from './../../providers/utils.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Movimiento } from '../../models/cuenta.models';

/**
 * Generated class for the DetallePagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detalle-pago',
  templateUrl: 'detalle-pago.html',
})
export class DetallePagoPage {

  movimiento : Movimiento=new Movimiento()

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public utilServ: UtilsServiceProvider) {
  }

  ionViewDidLoad(){
  
    let mov: Movimiento = this.navParams.get('mov')
    if(mov){
      this.movimiento=mov
      console.log(this.movimiento.usuario.nombre);
      console.log(this.movimiento.usuario.apellido);
      
    }else{
      this.utilServ.dispararAlert("Upss!", "Ocurrió un error al cargar el movimiento")
    }
  }

}
