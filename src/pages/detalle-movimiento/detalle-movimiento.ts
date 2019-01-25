import { Movimiento } from './../../models/cuenta.models';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../providers/usuario.service';
import { UtilsServiceProvider } from '../../providers/utils.service';


@Component({
  selector: 'page-detalle-movimiento',
  templateUrl: 'detalle-movimiento.html',
})
export class DetalleMovimientoPage {

  movimiento : Movimiento=new Movimiento
  movVinculado : boolean

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public utilServ: UtilsServiceProvider,
    public usuServ: UsuarioService ) {
  }

  ionViewDidLoad() {
    let mov: Movimiento = this.navParams.get('mov')
    if(mov){
      this.movimiento=mov
      if(mov.referencia!=null){
        this.movVinculado=true
      }
    }else{
      this.utilServ.dispararAlert("Upss!", "Ocurrió un error al cargar el movimiento")
    }
  }

  consultar(id : string){
    console.log("Consultar vinculado");
    
  }

}
