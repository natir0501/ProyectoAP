import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Campeonato, Fecha, Partido, Lugar } from '../../models/campeonato.model';
import { Ruedas } from '../../models/enum.models';
import { CampeonatoService } from '../../providers/campeonato.service';
import { UtilsServiceProvider } from '../../providers/utils.service';
import { UsuarioService } from '../../providers/usuario.service';

/**
 * Generated class for the DetalleFechaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detalle-fecha',
  templateUrl: 'detalle-fecha.html',
})
export class DetalleFechaPage {

  campeonato: Campeonato = new Campeonato();
  fecha: Fecha = new Fecha();
  fechaEncuentrotxt = `2019-01-04T02:01`;
  rueda = Object.keys(Ruedas).map(key => ({ 'id': key, 'value': Ruedas[key] }));

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public campServ: CampeonatoService,
    public utilServ: UtilsServiceProvider,
    public usuServ: UsuarioService) {
  }

  ionViewDidLoad() {
    let f: Fecha = this.navParams.get('fecha')
    if (f) {
      this.fecha = f
    }
  }

  diayhora(): string {
    return new Date(this.fecha.fechaEncuentro).toLocaleString()
  }

}
