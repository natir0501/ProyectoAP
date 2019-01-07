import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Campeonato, Fecha } from '../../../models/campeonato.model';
import { UtilsServiceProvider } from '../../../providers/utils.service';
import { CampeonatoService } from '../../../providers/campeonato.service';

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

  campeonato: Campeonato = new Campeonato;
  fecha: Fecha = new Fecha;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public campServ: CampeonatoService,
    public utilServ: UtilsServiceProvider) {
  }

  ionViewDidLoad() {
    let fecha: Fecha = this.navParams.get('fecha')
    if (fecha) {
      console.log("Voy a editar");
      this.fecha = fecha
    }
  }

}
