import { TipoEventoService } from './../../../providers/tipoevento.service';
import { TipoEvento } from './../../../models/tipo.evento.models';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { UtilsServiceProvider } from '../../../providers/utils.service';

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

  tipoEvento: TipoEvento = new TipoEvento;

  @ViewChild("form") formulario: NgForm

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public utilServ: UtilsServiceProvider, public tipEventServ: TipoEventoService) {
  }

  ionViewDidLoad() {
    /*
    let te: TipoEvento = this.navParams.get('te')
    if (te) {
      this.tipoEvento = te
    }*/
    console.log('entre');
    
  }

  onSubmit() {
    console.log("something");

  }

}
