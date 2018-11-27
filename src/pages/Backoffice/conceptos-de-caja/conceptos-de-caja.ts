import { ConceptoCaja } from './../../../models/concepto.models';
import { Concepto } from './../../../models/categoria.models';
import { ConceptoService } from './../../../providers/concepto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsServiceProvider } from '../../../providers/utils.service';

/**
 * Generated class for the ConceptosDeCajaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conceptos-de-caja',
  templateUrl: 'conceptos-de-caja.html',
})
export class ConceptosDeCajaPage {

  concepto: ConceptoCaja = new ConceptoCaja();
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public conceptoServ: ConceptoService, public utilServ: UtilsServiceProvider) {
  }

  ionViewDidLoad() {
    this.conceptoServ.obtenerConceptos()
      .subscribe((resp) => {
        this.concepto = resp.data.concepto
      },
        (err) => {
          console.log("Error obteniendo conceptos de caja", err)
          this.utilServ.dispararAlert("Error", "Ocurrió un error al obtener los conceptos de caja")
        })
  }

}
