import { Partido, Campeonato, Fecha, Lugar } from './../../../models/campeonato.model';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsServiceProvider } from '../../../providers/utils.service';
import { CampeonatoService } from '../../../providers/campeonato.service';
import { NgForm } from '@angular/forms';
import { Ruedas } from '../../../models/enum.models';

/**
 * Generated class for the MantenimientoFechaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mantenimiento-fecha',
  templateUrl: 'mantenimiento-fecha.html',
})
export class MantenimientoFechaPage {

  @ViewChild('form') form: NgForm

  campeonato: Campeonato = new Campeonato();
  fecha: Fecha = new Fecha();
  partido: Partido= new Partido();
  lugar: Lugar = new Lugar();
  fechaEncuentrotxt= `2019-01-04T02:01`;
  rueda = Object.keys(Ruedas).map(key => ({ 'id': key, 'value': Ruedas[key] }));

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public campServ: CampeonatoService,
    public utilServ: UtilsServiceProvider) {
      this.fechaEncuentrotxt=this.utilServ.fechahoraToText(new Date())
  }

  ionViewDidLoad() {
    let fecha: Fecha = this.navParams.get('fecha')
    if (fecha) {
      console.log("Voy a editar");
      this.fecha = fecha
    }
  }

  onSubmit() {
    console.log('submit!!!')
  }


}
