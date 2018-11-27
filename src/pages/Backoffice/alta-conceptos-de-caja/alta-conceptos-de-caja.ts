import { ConceptoCaja } from './../../../models/concepto.models';
import { ConceptoService } from '../../../providers/concepto.service';
import { Concepto } from '../../../models/categoria.models';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Tipos } from '../../../models/enum.models';
import { UtilsServiceProvider } from '../../../providers/utils.service';


@Component({
  selector: 'page-alta-conceptos-de-caja',
  templateUrl: 'alta-conceptos-de-caja.html'
})
export class AltaConceptosDeCajaPage {

  concepto: ConceptoCaja = new ConceptoCaja();
  tipo = Object.keys(Tipos).map(key => ({ 'id': key, 'value': Tipos[key] }))

  @ViewChild("form") formulario: NgForm

  constructor(public navCtrl: NavController,
    public conceptoServ: ConceptoService,
    public utilServ: UtilsServiceProvider) {
  }

  ionViewDidLoad() {

  }


  onSubmit() {
    if (this.concepto._id === '') {
      this.conceptoServ.agregarConcepto(this.concepto)
        .subscribe(
          (resp) => {
            this.utilServ.dispararAlert("Ok", "Concepto agregado correctamente.")
            this.concepto.nombre = ''
            this.concepto.tipo = ''
          },
          (err) => {
            console.log("Error dando de alta el concepto", err)
            this.utilServ.dispararAlert("Error", "Ocurrió un error al agregar el concepto")
          }
        )

    } else {
      this.conceptoServ.actualizarConcepto(this.concepto)
        .subscribe(
          (resp) => {
            this.utilServ.dispararAlert("Ok", "Concepto modificado correctamente.")
            this.concepto.nombre = ''
            this.concepto.tipo = ''
          },
          (err) => {
            console.log("Error al modificar el concepto", err)
            this.utilServ.dispararAlert("Error", "Ocurrió un error al modificar el concepto")
          }
        )

    }

  }

}
